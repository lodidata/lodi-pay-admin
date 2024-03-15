const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const qetag = require('./config/qetag')
const email = require('./email')
const argList = require('./build/getArgList')()

const prefix = argList.pre || ''
const cdn = argList.cdn || ''
const mac = new qiniu.auth.digest.Mac(argList.ak, argList.sk)

console.log(`\n\n\n\n\n\ncdn:${cdn}`)
prefix && console.log(`pre:${prefix}\n\n`)

const util = {
  // 生成上传需要的凭证
  createToken() {
    const uploadToken = new qiniu.rs.PutPolicy({
      scope: argList.bucket
    }).uploadToken(mac)
    const qiniuConfig = new qiniu.conf.Config()
    const formUploader = new qiniu.form_up.FormUploader(qiniuConfig)
    const putExtra = new qiniu.form_up.PutExtra()
    return { uploadToken, qiniuConfig, formUploader, putExtra }
  },
  // 获取七牛规则的文件hash值
  getHash(file) {
    return new Promise((resolve, reject) => {
      qetag(file, hash => {
        resolve(hash)
      })
    })
  },
  // 递归文件夹
  reFolder(dir, filterFile) {
    let res = []
    let item = []
    const fileArr = fs.readdirSync(path.resolve(__dirname, dir))
    fileArr.map(x => {
      if (x.indexOf('.') < 0) {
        item = this.reFolder(dir + '/' + x, x)
      } else {
        if (filterFile.indexOf(x) < 0) {
          const pre = prefix ? prefix + '/' : ''
          item = [
            {
              key:
                pre +
                (dir + '/' + x)
                  .split('/')
                  .splice(1)
                  .join('/'),
              localFile: `${__dirname}/${dir}/${x}`
            }
          ]
        }
      }
      res = res.concat(item)
    })
    return res
  },
  // 获取线上所有文件
  getList(tokenConfig) {
    return new Promise((resolve, reject) => {
      const bucketManager = new qiniu.rs.BucketManager(mac, tokenConfig.qiniuConfig)
      const options = {
        prefix: prefix
      }
      bucketManager.listPrefix(argList.bucket, options, function(error, body, info) {
        if (error) {
          console.log(`bucket--`, argList.bucket)
          console.log(`options--`, options)
          console.log(error)
          throw error
        }
        if (info && info.statusCode === 200) {
          resolve(body.items)
        } else {
          console.log(info, body)
          reject(body)
        }
      })
    })
  },
  // 删除两个数组里重复的文件,判断hash和文件名
  deleteDiff(a, b) {
    const arr1 = [].concat(a)
    const arr2 = [].concat(b)
    // 过滤a
    b.map((x, i) => {
      arr1.map((y, j) => {
        if (x.hash === y.hash && x.key === y.key) {
          arr1.splice(j, 1)
        }
      })
    })
    // 过滤b
    a.map((x, i) => {
      arr2.map((y, j) => {
        if (x.hash === y.hash && x.key === y.key) {
          arr2.splice(j, 1)
        }
      })
    })
    return [arr1, arr2]
  },
  // 上传单个文件
  uploadFile(file, tokenConfig) {
    const { uploadToken, formUploader, putExtra } = tokenConfig
    return new Promise((resolve, reject) => {
      formUploader.putFile(uploadToken, file.key, file.localFile, putExtra, function(
        error,
        body,
        info
      ) {
        !error || (info && info.statusCode === 200)
          ? resolve({ body, info })
          : resolve({ error, body, info })
      })
    })
  },
  // 删除单个文件
  deleteFile(file, { qiniuConfig }) {
    return new Promise((resolve, reject) => {
      const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig)
      bucketManager.batch([qiniu.rs.deleteOp(argList.bucket, file.key)], function(
        error,
        body,
        info
      ) {
        !error || (info && info.statusCode === 200)
          ? resolve({ body, info })
          : resolve({ error, body, info })
      })
    })
  },
  // 刷新单个cdn文件
  refreshFile(file) {
    return new Promise((resolve, reject) => {
      const cdnManager = new qiniu.cdn.CdnManager(mac)
      const need = cdn + file.key
      cdnManager.refreshUrls([need], function(error, body, info) {
        !error || (info && info.statusCode === 200)
          ? resolve({ body, info })
          : resolve({ error, body, info })
      })
    })
  },
  // log
  showLog(action, res, name, num1, num2) {
    const showState = res.error ? 'error' : 'success'
    console.log(`[${action}] [${showState}] [${num1}/${num2}]  ${name}`)
  }
}

class QiniuClass {
  constructor({ srcPath }) {
    this.filterFile = ['.DS_Store'] // 需要屏蔽的文件
    this.srcPath = srcPath // 目标文件夹
    this.files = [] // 本地文件列表
    this.onlineList = [] // 线上文件列表
    this.needUpload = [] // 需要上传的文件
    this.needDelete = [] // 需要删除的线上文件
    this.deletes = [] // 已删除的线上文件
    this.uploads = [] // 已经上传的本地文件
    this.refreshs = [] // 已刷新cdn文件
  }
  // 筛选需要处理的本地和线上文件
  async _screen() {
    // 获取本地文件
    this.files = util.reFolder(this.srcPath, this.filterFile)
    for (const i in this.files) {
      this.files[i].hash = await util.getHash(this.files[i].localFile)
    }
    // 获取线上文件
    this.onlineList = await util.getList(util.createToken())
    console.log(`线上文件数：${this.onlineList.length},本地文件数：${this.files.length}`)
    // 判断需要删除和上传的文件
    const [needUpload, needDelete] = util.deleteDiff(this.files, this.onlineList)
    this.needUpload = needUpload
    this.needDelete = needDelete
    console.log(`需上传文件数：${this.needUpload.length},需删除文件数：${this.needDelete.length}\n`)
  }
  // 删除线上文件
  async _delete() {
    // 删除线上文件
    if (this.needDelete.length > 0) {
      console.log('> 开始删除线上文件')
      for (const x in this.needDelete) {
        const tokenConfig = util.createToken()
        const res = await util.deleteFile(this.needDelete[x], tokenConfig)
        this.deletes.push(res)
        util.showLog(
          'delete',
          res,
          this.needDelete[x].key,
          this.deletes.length,
          this.needDelete.length
        )
      }
    }
  }
  // 上传本地图片
  async _upload() {
    // 上传本地文件
    if (this.needUpload.length > 0) {
      console.log('> 开始上传本地文件')
      for (const x in this.needUpload) {
        const tokenConfig = util.createToken()
        const res = await util.uploadFile(this.needUpload[x], tokenConfig)
        this.uploads.push(res)
        util.showLog(
          'upload',
          res,
          this.needUpload[x].key,
          this.uploads.length,
          this.needUpload.length
        )
      }
    }
  }
  // 刷新cdn文件
  async _refresh() {
    // 刷新新上传文件的cdn
    if (this.needUpload.length > 0 && cdn) {
      console.log('> 开始刷新cdn文件')
      for (const x in this.needUpload) {
        const res = await util.refreshFile(this.needUpload[x])
        this.refreshs.push(res)
        util.showLog(
          'refresh',
          res,
          this.needUpload[x].key,
          this.refreshs.length,
          this.needUpload.length
        )
      }
    }
  }
  // 统计文件
  async _statistical() {
    const [deleteSuccess, deleteError] = this.deletes.reduce(
      (a, b) => {
        b.error ? a[1]++ : a[0]++
        return a
      },
      [0, 0]
    )
    const [uploadSuccess, uploadError] = this.uploads.reduce(
      (a, b) => {
        b.error ? a[1]++ : a[0]++
        return a
      },
      [0, 0]
    )
    const [refreshSuccess, refreshError] = this.refreshs.reduce(
      (a, b) => {
        b.error ? a[1]++ : a[0]++
        return a
      },
      [0, 0]
    )
    if (deleteError !== 0 || uploadError !== 0 || refreshError !== 0) {
      email.sendmail('发包失败了！！！', JSON.stringify(argList))
    }
    console.log(
      `\n删除文件 -->  total:${
        this.needDelete.length
      }  success:${deleteSuccess}  error:${deleteError}`
    )
    console.log(
      `上传文件 -->  total:${
        this.needUpload.length
      }  success:${uploadSuccess}  error:${uploadError}`
    )
    console.log(
      `刷新文件 -->  total:${
        this.needUpload.length
      }  success:${refreshSuccess}  error:${refreshError}\n\n\n\n\n\n`
    )
  }
  async start() {
    await this._screen()
    // await this._delete();不再删除已上传文件
    await this._upload()
    await this._refresh()
    this._statistical()
  }
}

const option = {
  srcPath: 'public'
}

new QiniuClass(option).start()
// new QiniuClass(option)._delete();
