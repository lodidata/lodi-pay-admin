<template>
  <div id="Account">
    <Spin fix v-if="loading.page"></Spin>
    <date-more :dates.sync="created_at" :title="i18n_lang.recharge17"></date-more>

    <Card dis-hover class="query_box">
      <div class="query_con mb30">
        <div class="item">
          <span>{{ i18n_lang.recharge13 }}</span>
          <Input v-model="query.inner_orders_pay_sn" clearable style="width:120px;" />
        </div>
        <div class="item">
          <span>{{ i18n_lang.recharge14 }}</span>
          <Input v-model="query.order_sn" clearable style="width:120px;" />
        </div>
        <!--商户号-->
        <div class="item">
          <span>{{ i18n_lang.recharge36 }}</span>
          <Input v-model="query.merchant_account" clearable style="width:120px;" :disabled="userInfo.merchant_account?true:false"/>
        </div>
        <div class="item">
          <span>{{ i18n_lang.recharge37 }}</span>
          <Input v-model="query.user_account" clearable style="width:120px;" />
        </div>
        <div class="item">
          <span>{{ i18n_lang.recharge15 }}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{ i18n_lang.recharge16 }}</Option>
            <Option :value="item.id" v-for="(item, i) in stateList" :key="i">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="query_btns">
          <Button type="primary" v-auth="42" @click="getData()">{{ i18n_lang.recharge18 }}</Button>
          <Button type="primary" v-auth="42" @click="reset">{{ i18n_lang.recharge19 }}</Button>
        </div>
      </div>
      <!-- <Button type="primary" @click="addAccount('add')">新增</Button> -->
    </Card>
    <div style="marginTop:30px">
      <Table :columns="columns" :data="dataSource" border></Table>

      <Page class="page_box" :current="page.currentPage" :page-size="page.page_size" :total="page.total" show-sizer
        @on-change="getData" @on-page-size-change="changepage_size" placement="top"></Page>
    </div>

    <!-- 改密 
    <Modal v-model="visible.password" :title="i18n_lang.recharge20" :width="500">
      <Spin v-if="loading.password" size="large" fix></Spin>
      <Form ref="pwInfo" :model="pwInfo" :label-width="100" :rules="PwRuleValidate">
        <FormItem :label="i18n_lang.recharge21" prop="password">
          <Input v-model="pwInfo.password" />
        </FormItem>
        <FormItem :label="i18n_lang.recharge22" prop="password_confirm">
          <Input v-model="pwInfo.password_confirm" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.password" @click="changePw">{{ i18n_lang.recharge23 }}</Button>
      </div>
      
    </Modal>-->
    <!-- 查看图片 -->
    <image-preview ref="imgPreviewRef"></image-preview>
     <!--详情-->
    <Modal v-model="visible.detail" id="rechargeDetail" :title="i18n_lang.recharge40" :width="500">
         <Card dis-hover class="query_box creat-disputeDetail" >
            <p>{{i18n_lang.recharge47}}</p>
                <div class="item">
                    <!--充值订单号-->
                    <div class="item_name">
                        {{i18n_lang.recharge13}}:
                    </div>
                    <div class="item_val" >
                        {{detailData.inner_order_sn}}
                    </div>
                </div>
                <div class="item">
                    <!--商户订单号-->
                    <div class="item_name">
                        {{i18n_lang.recharge14}}:
                    </div>
                    <div class="item_val" >
                         {{detailData.order_sn}}
                    </div>
                </div>
                <div class="item">
                    <!--匹配订单时间-->
                    <div class="item_name">
                        {{i18n_lang.recharge48}}:
                    </div>
                    <div class="item_val" >
                           {{detailData.created_at}}
                    </div>
                </div>
                <div class="item">
                    <!--订单来源商户-->
                    <div class="item_name">
                        {{i18n_lang.recharge49}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.merchant_account}}
                    </div>
                </div>
                <div class="item">
                    <!--充值方式-->
                    <div class="item_name">
                        {{i18n_lang.recharge5}}:
                    </div>
                    <div class="item_val">
                          {{detailData.payment}}
                    </div>
                </div>
                <div class="item">
                    <!--充值账户-->
                    <div class="item_name">
                        {{i18n_lang.recharge6}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.user_account}}
                    </div>
                </div>
                <div class="item">
                    <!--充值金额-->
                    <div class="item_name">
                        {{i18n_lang.recharge7}}:
                    </div>
                    <div class="item_val">
                          {{detailData.amount}}
                    </div>
                </div>
                
                <div v-if="detailData && detailData.attachment" style="margin-top:10px">
                    <!--凭证信息-->
                    <h3>{{i18n_lang.recharge50}}</h3>
                    <div class="item">
                        <!--凭证提交时间-->
                        <div class="item_name">
                            {{i18n_lang.recharge51}}:
                        </div>
                        <div class="item_val">
                            {{detailData.attachment.created_at}}
                        </div>
                    </div>
                     <div >
                        <!--备注-->
                        <div class="item_name">
                            {{i18n_lang.recharge46}}:
                        </div>
                        <div class="item_val" v-if="detailData.order_pay">
                            {{detailData.attachment.remark}}
                        </div>
                    </div>
                    <div>
                        <img v-for="(item,index) in detailData.attachment.url" @click="showImg(item)" :key="index"  :src="item"/>
                    </div>
                </div>
         </Card>
          <!-- 查看图片 -->
        <image-preview ref="imgPreviewRefs"></image-preview>
    </Modal>

     <!--上传凭证-->
    <Modal v-model="visible.toBeUploaded" :title="i18n_lang.recharge41" :width="500">
         <Form
            ref="toBeUploadedInfo"
            :model="toBeUploadedInfo"
            :label-width="100"
            :rules="toBeUploadedRules"
          > 
          <!--备注-->
            <FormItem :label="i18n_lang.recharge46" prop="remark">
                <Input v-model="toBeUploadedInfo.remark"  type="textarea" :rows="4" />
            </FormItem>
            <!--凭证-->
            <FormItem :label="i18n_lang.recharge52"  >
                  <span  v-for="(item,index) in toBeUploadedInfo.fileList" :key="index" style="position: relative;width:100px;height:100px;display: inline-block;margin-right:10px">
                    <img   :src="item.fileValue" alt  style="width:100px;height:100px;">
                    <Icon :size="18" type="ios-close-circle-outline" @click="delImg(index)" style=" position: absolute;top:-9px;right:-9px" />
                  </span>
                  <Upload 
                    :before-upload="handleUpload" 
                    action
                    multiple
                    :format="['jpg','jpeg','png']">
                    <Button icon="ios-cloud-upload-outline">{{i18n_lang.recharge53}}</Button>
                  </Upload>
            </FormItem>
            <!--处理方案-->
             <FormItem :label="i18n_lang.recharge54" >
                 {{i18n_lang.recharge55}}
            </FormItem>
         </Form>
          <div slot="footer">
          <Button type="primary" :loading="loading.uploadedInfo" @click="orderTrial">{{i18n_lang.recharge56}}</Button>
        </div>
    </Modal>
  </div>
</template>
  
<script>
import columns from './columns.js'
import MoreOptionCheck from '../../../components/MoreOptionCheck'
 import imagePreview from "./image-preview/imagePreview.vue"
import { formatDateToString } from '@/libs/date'

const initDate = {
  from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}
let initData = {
  admin_name: '', // 账号
  password: '', // 密码
  password_confirm: '', // 重复密码
  real_name: '', // 姓名
  position: '', // 部门
  department: '', // 职位
  role_id: [] // 权限
}
const initPw = {
  id: '',
  password: '',
  password_confirm: '',
}
export default {
  name:'recharge',
  components: {
    MoreOptionCheck
  },
  data() {
    const i18n_lang = this.$t('recharge');
    return {
      loading: {
        page: 0,
        addBtn: false,
        ipBtn: false,
        password: false
      },
      i18n_lang,
      visible: {
        addModel: false,
        password: false,
        detail:false, //详情弹框
        toBeUploaded:false
      },
      columns: columns(this),
      dataSource: [],
      page: {
        page_size: 10,
        total: 0,
        currentPage: 1
      },
      detailData:{

      },
      query: {
        inner_orders_pay_sn: '',
        order_sn: '',
        merchant_account: '',
        user_account: '',
        status: '', // 状态 1=待匹配 2=待上传凭证 3=上传凭证超时 4=待确认 5=确认超时 6=订单完成 7=订单异常
      },

      created_at: [initDate.from, initDate.to],// 默认日期
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      roleList: [],
      stateList: [
        // { id: 1, name: i18n_lang.recharge24 },
        { id: 2, name: i18n_lang.recharge25 },
        { id: 3, name: i18n_lang.recharge26 },
        { id: 4, name: i18n_lang.recharge27 },
        { id: 5, name: i18n_lang.recharge28 },
        { id: 6, name: i18n_lang.recharge29 },
        //{ id: 7, name: i18n_lang.recharge30  },
        // { id: 8, name: i18n_lang.recharge34  },
        { id: 9, name: i18n_lang.recharge35 },
        { id: 10, name: i18n_lang.recharge38 },

      ], // 状态数据
      addForm: { ...initData },
      editType: 'add', // 修改类型gst
      toBeUploadedRules:{
          remark: [{ required: true, message: i18n_lang.recharge31 }],
      },
      addRuleValidate: {
        admin_name: [{ required: true, message: i18n_lang.recharge31 }],
        password: [{ required: true, message: i18n_lang.recharge31 }],
        real_name: [{ required: true, message: i18n_lang.recharge31 }],
        position: [{ required: true, message: i18n_lang.recharge31 }],
        department: [{ required: true, message: i18n_lang.recharge31 }],
        role_id: [{ required: true, message: i18n_lang.recharge31 }],
        password_confirm: [
          { required: true, message: i18n_lang.recharge31 },
          {
            validator: (rule, value, cb) =>
              this.addForm.password === this.addForm.password_confirm ? cb() : cb(i18n_lang.recharge31)
          }
        ]
      },
      toBeUploadedInfo:{
        id:'',
        type:'upload',
        remark:'',
        fileList:[]
      },
      fileValue:'',
      fileData: {
        base64:  null,
        formData: null,
        fileName: '',
        file:null
      },
      pwInfo: { ...initPw },
      PwRuleValidate: {
        password: [{ required: true, message: i18n_lang.recharge31 }],
        password_confirm: [
          { required: true, message: i18n_lang.recharge31 },
          {
            validator: (rule, value, cb) =>
              this.pwInfo.password === this.pwInfo.password_confirm ? cb() : cb(i18n_lang.recharge32)
          }
        ]
      },
    }
  },
  components:{
    imagePreview
  },
  computed:{
    userInfo() {
      return this.$store.state.user.userInfo
    },
  },
  created() {
    this.init()
  },
  methods: {
    init(){
        let parameter = sessionStorage.getItem('parameter') || '{}';
        this.query.inner_orders_pay_sn = this.$route.query.inner_orders_pay_sn;
        this.query.merchant_account = this.$route.query.merchant_account;
        this.query.user_account = this.$route.query.user_account;

        if(this.userInfo.merchant_account){ //判断是否是商户
            this.query.merchant_account=this.userInfo.merchant_account;
        }

        //带参数过来查询时取消当日期
        if(this.$route.query.inner_orders_pay_sn || this.$route.query.merchant_account ||this.$route.query.user_account){
          this.created_at=['','']
          this.getData()
        }else if(JSON.parse(parameter).recharge){
            let rechargeQuery= JSON.parse(parameter).recharge;
            if(rechargeQuery.created_at){
              this.created_at=rechargeQuery.created_at
            }
            this.query.inner_orders_pay_sn=rechargeQuery.inner_orders_pay_sn||'';
            this.query.order_sn=rechargeQuery.order_sn||'';
            this.query.merchant_account=rechargeQuery.merchant_account||'';
            this.query.user_account=rechargeQuery.user_account||'';
            this.query.status=rechargeQuery.status||'';
            this.page.currentPage=rechargeQuery.currentPage,
            this.page.page_size=rechargeQuery.page_size;
            this.getData(this.page.currentPage);
        }else{
            this.getData()
        }
    },
    // 保存用户信息
    async save() {
      this.loading.addBtn = true
      this.$refs['addForm'].validate(async valid => {
        this.loading.addBtn = false
        if (valid) {
          if (this.editType === 'add') {
            this.add()
          } else if (this.editType === 'edit') {
            this.editData()
          } else {
            this.update()
          }
        }
      })
    },
      // 选择图片
      handleUpload(file) {
        //console.log(file)
        if(this.toBeUploadedInfo.fileList.length>=3){
          this.$Message.warning(this.i18n_lang.recharge58);
          return;
        }
        let fileData={}
        fileData.fileName = file.name
        fileData.formData = new FormData()
        fileData.formData.append('file', file)
        fileData.formData.append('name', file.name)

        
        // 读取文件
        const reader = new FileReader()
        // 读取文件的url
        reader.readAsDataURL(file)
        reader.onload = e => {
          // 读取成功
          fileData.fileValue = e.target.result;
          this.toBeUploadedInfo.fileList.push(fileData);
          this.onUpload(fileData)
        }
        return false
      },
      //上传图片
      async onUpload(fileData){
        const res = await this.$axios.request({
          url: `/upload`,
          method: 'POST',
          data: fileData.formData
        })
        if (res.status !== 200 || res.state !== 0) {
          this.$Message.error(res.message);
          return;
        }
        this.toBeUploadedInfo.fileList[this.toBeUploadedInfo.fileList.length-1].url=res.data.url;
        //this.orderTrial(res.data.url)
      },
      //删除选中的图片
      delImg(index){
          this.toBeUploadedInfo.fileList.splice(index, 1)
      },
      //待上传 待确认上传请求
      async orderTrial(){
        this.$refs['toBeUploadedInfo'].validate(async valid => {

              this.loading.uploadedInfo=true;
              let urls=[];

              this.toBeUploadedInfo.fileList.forEach(item=>{
                if(item.url){
                  urls.push(item.url)
                }
              })
            // urls=['https://tgcps3.s3.ap-southeast-1.amazonaws.com/lodipay-test/a1c5530322a4a514657943ea40444e73.jpg']

              if(urls.length==0){
                  this.$Message.error(this.i18n_lang.recharge57);
                  this.loading.uploadedInfo=false;
                  return;
              }
              let req={
                url:urls,
                remark:this.toBeUploadedInfo.remark,
              }

              const res = await this.$axios.request({
                url: `/orders/collection/status/${this.toBeUploadedInfo.id}`,
                method: 'PUT',
                data: req
              })
              this.loading.uploadedInfo=false;
              if (res.status !== 200 || res.state !== 0) {
                this.$Message.error(res.message)
                return;
              }
              this.$Message.success(res.message);
              this.visible.toBeUploaded=false;
                
              this.getData(this.page.currentPage)
        })
      
      },
      /**标记争议 */
     async handleDispute(row){
         const res = await this.$axios.request({
            url: `/orders/collection/status`,
            method: 'post',
            data: {
              orders_collection_sn: row.inner_order_sn
            }
        })
        if (res.state !== 0) {
          this.$msg({
              type: 'error',
              message: res.message
          })
          return
        } else {
          this.$msg({
              type: 'success',
              message: res.message
          })
          this.getData(this.page.currentPage)
        }
     },
    async getData(i = 1) {
      if (i) this.page.currentPage = i;
      this.loading.page++
      let arr = []
      let m, y;
      if (this.created_at[0] != '') {

        m = formatDateToString(new Date(this.created_at[0])) + ' 00:00:00'
        y = formatDateToString(new Date(this.created_at[1])) + ' 23:59:59'
        arr = [m, y]
      } else {
        arr = []
      }
      let query = {
        page: this.page.currentPage,
        page_size: this.page.page_size,
        ...this.query,
        created_at: arr
      }
      
      const res = await this.$axios.request({
        url: '/orders/collection',
        method: 'get',
        params: query
      })
      if (res.status !== 200 || res.state !== 0 ) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }

       let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)

        parameter.recharge = {
          ...this.query,
          currentPage: this.page.currentPage,
          page_size: this.page.page_size,
          created_at:this.created_at
        }

        sessionStorage.setItem('parameter', JSON.stringify(parameter))


      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      this.dataSource = res.data
      this.loading.page--
    },
    // 启用停用
    async handleStop(row) {
      let res = await this.$axios.request({
        url: `/admin/status/${row.id}`,
        method: 'put',
      })
      if (res.status !== 200 || res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.error(res.message)
        this.getData(this.page.currentPage)
      }
    },

    // 删除
    async handleDelete(row) {
      let res = await this.$axios.request({
        url: `/admin/${row.id}`,
        method: 'delete'
      })
      if (res.status !== 200 || res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getData()
      }
    },
    reset() {
      this.query = {
        inner_orders_pay_sn: '',
        order_sn: '',
        merchant_account: '',
        user_account: '',
        status: '',
      }
      if(this.userInfo.merchant_account){ //判断是否是商户
          this.query.merchant_account=this.userInfo.merchant_account;
      }
      this.created_at = [initDate.from, initDate.to]
      this.getData()
    },
    // 设置每页条数
    changepage_size(page_size) {
      this.page.page_size = page_size
      this.getData()
    },
    // 翻页
    changePage(val) {
      this.page.currentPage = val
      this.getData(val)
    },
    // 选择日期
    handleChangeDate(val) {
      // [this.query.start_date, this.query.end_date] = val
      this.created_at = val
    },
    chnageLimitRecharge(val) {
      console.log(val)
    },
    // 查看图片
    handleView (row){
      console.log(row)
      let uploadImagesUrlArr = row.url
      this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
    },
   async handleEdit(row,type){
      //详情
      if(type==="detail"){
          let res = await this.$axios.request({
            url: `/orders/collection/show/${row.id}`,
            method: 'GET'
          })
          if (res.status !== 200 || res.state !== 0) {
            this.$Message.error(res.message)
          }
          this.visible.detail=true;
          this.detailData=res.data;
         // console.log(res.data)
      }else if(type==="showDispute"){
        this.$router.push({
            path: `/dispute`,
            query: {
            inner_order_sn: row.inner_order_sn
            }
        })
      }else if(type==="upload"){
        this.toBeUploadedInfo.id=row.id;
        this.toBeUploadedInfo.remark='';
        this.toBeUploadedInfo.fileList=[];
        this.toBeUploadedInfo.type="upload"
        this.visible.toBeUploaded=true;
      }
    },
    showImg(url){
        this.$refs.imgPreviewRefs.loadImages([url]);
    }
  }
}
</script>
  
<style lang="less">
#rechargeDetail{


.creat-disputeDetail{
        overflow: hidden;
        background-color: white;
        padding: 10px;
        p{
            color:#2d8cf0
        }
        img{
            width: 80px;
            height: 80px;
            margin: 10px;
       }
    }
    .ivu-col-span-11{
        padding: 0px 10px;
    }
    .item{
       display: flex;
       justify-content: space-between; 
       margin-top: 10px;
       font-size: 14px;
       line-height: 30px;
       height: 30px;
    }
}
</style>