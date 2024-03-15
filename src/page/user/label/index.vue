<template>
    <div id="Account">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="query_box">
        <!-- <div class="query_con mb30">
          <div class="item">
            <span>管理员账号</span>
            <Input v-model="query.admin_name" style="width:120px;"/>
          </div>
          <div class="item">
            <span>状态</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>全部</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div>
          <div class="query_btns">
            <Button type="primary" @click="getData">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
          </div>
        </div> -->
        <Button type="primary" v-auth="16" @click="handle('add')">{{i18n_lang.userLabel13}}</Button>
      </Card>
      <div style="marginTop:30px">
        <Table :columns="columns" :data="dataSource" border></Table>
        <Page
          class="page_box"
          :current="page.currentPage"
          :page-size="page.page_size"
          :total="page.total"
          show-sizer
          @on-change="getData"
          @on-page-size-change="changepage_size"
          placement="top"
        ></Page>
      </div>

      <!-- 新增/编辑 -->
      <!-- 新增 `${editType === 'add' ? '新增' : '编辑'}管理员`-->
    <Modal
      v-model="visible.addModel"
      :title="editType === 'add' ? i18n_lang.userLabel4 : i18n_lang.userLabel15"
      :width="500"
      @on-cancel="visible.addModel = false"
    >
      <Spin v-if="loading.add" size="large" fix></Spin>
      <Form
        v-if="visible.addModel"
        ref="addForm"
        :model="addForm"
        :label-width="100"
        :rules="addRuleValidate"
      >
        <FormItem :label="i18n_lang.userLabel16" prop="name">
          <Input v-model="addForm.name"/>
        </FormItem>
        <FormItem :label="i18n_lang.userLabel17" prop="description">
          <Input v-model="addForm.description"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="save">{{i18n_lang.userLabel18}}</Button>
      </div>
    </Modal>


    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  let initData = {
    name: '',
    description: '',
  }
  export default {
    data () {
       const i18n_lang = this.$t('userLabel');
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
          password: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          currentPage: 1
        },
        query: {
          admin_name: '',
          status: '',
        },
        dataValue: [, ], // 默认日期
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() - 86400000
          }
        },
        roleList: [],
        stateList: [{ id: 1, name:i18n_lang.userLabel8 }, { id: 0, name: i18n_lang.userLabel19 }], // 状态数据
        addForm: {...initData},
        editType: 'add', // 修改类型
        addRuleValidate: {
            name: [{ required: true, message: i18n_lang.userLabel20 }],
            description: [{ required: true, message: i18n_lang.userLabel20 }],
        },
      }
    },
    created () {
      this.getData()
    //   this.getRole()
    },
    methods: {
      // 添加用户弹框
      async handle (type) {
        this.editType = type
        this.visible.addModel = true
        this.addForm = Object.assign({}, initData)
      },
       // 编辑/改密
       async handleEdit (row, type) {
        if (type === 'edit') {
            this.editType = type
            this.visible.addModel = true
            this.addForm = Object.assign({}, initData)

            this.addForm.id = row.id
            this.addForm.name = row.name
            this.addForm.description = row.description
        }
      },
      // 保存用户信息
      async save () {
        this.loading.addBtn = true
        this.$refs['addForm'].validate(async valid => {
          this.loading.addBtn = false
          if (valid) {
            if (this.editType === 'add') {
              this.add()
            } else if (this.editType === 'edit') {
              this.editData()
            }
          }
        })
      },
      // 新增接口
      async add () {
        const { ...rest } = this.addForm;
        let res = await this.$axios.request({
          url: `/tag`,
          method: 'post',
          data: {
            ...rest,
          }
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          this.visible.addModel = false
          this.getData()
        }
      },
  
      // 编辑接口
      async editData () {
        // const role = this.addForm.role
        const { id, ...data } = this.addForm;
        const res = await this.$axios.request({
          url: `/tag/${id}`,
          method: 'PUT',
          data
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
        } else {
            this.visible.addModel = false
            this.$Message.success(this.i18n_lang.userLabel21)
            this.getData()
        }
      },
  
      async getData (i=1) {
        if (i) this.page.currentPage = i;
        this.loading.page++
        let query = {
          page: this.page.currentPage,
          page_size: this.page.page_size,
        //   ...this.query
        }
        const res = await this.$axios.request({
          url: '/tag',
          method: 'get',
          params: query
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.dataSource = res.data
        this.loading.page--
      },
      // 获取所有管理员角色
    //   async getRole () {
    //     let res = await this.$axios.request({
    //         url: `/admin/role/auth`,
    //         method: 'get',
    //         params: {
    //             page: 1,
    //             page_size: 100,
    //         }
    //     })
    //     if (res.status !== 200) {
    //       this.$Message.success(res.message)
    //       return
    //     }
    //     if (res.data.length) {
    //         this.roleList = res.data
    //     }
    //   },
    // 启用停用
    async handleStop(row){
        let res = await this.$axios.request({
            url: `/tag/${row.id}`,
            method: 'put',
            data: {
              status: !row.status
            }
        })
        if (res.state !== 0) {
            this.$Message.error(res.message)
        } else {
            this.$Message.success(res.message)
            this.getData()
        }
    },
   
      // 删除
      async handleDelete (row) { 
        let res = await this.$axios.request({
          url: `/tag/${row.id}`,
          method: 'delete'
        })
        if (res.status !== 200 || res.state !== 0) {
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          this.getData()
        }
      },
      reset () {
        this.query = {
          admin_name: '',
          status: ''
        }
        this.getData()
      },
      // 设置每页条数
      changepage_size (page_size) {
        this.page.page_size = page_size
        this.getData()
      },
      // 翻页
      changePage (val) {
        this.page.currentPage = val
        this.getData(val)
      },
      // 选择日期
    //   handleChangeDate (val) {
    //     [this.query.start_date, this.query.end_date] = val
    //   },
    //   chnageLimitRecharge(val) {
    //     console.log(val)
    //   }
    }
  }
  </script>
  
  <style>
  </style>