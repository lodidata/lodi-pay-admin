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
        <Button type="primary" @click="handle('add')">{{i18n_lang.siteList19}}</Button>
      </Card>
      <div style="marginTop:30px">
        <Table :columns="columns" :data="dataSource" border></Table>
        <Page
          class="page_box"
          :current="page.page"
          :page-size="page.page_size"
          :total="page.total"
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changepage_size"
          placement="top"
        ></Page>
      </div>

      <!-- 新增/编辑 -->
      <!-- 新增 `${editType === 'add' ? '新增' : '编辑'}管理员`-->
    <Modal
      v-model="visible.addModel"
      :title="editType === 'add' ? i18n_lang.siteList20 : i18n_lang.siteList18"
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
        <FormItem :label="i18n_lang.siteList21" prop="name">
          <Input v-model="addForm.name"/>
        </FormItem>
        <FormItem :label="i18n_lang.siteList16" prop="is_pay_behalf">
            <Select v-model="addForm.is_pay_behalf" style="width:200px">
                <Option :value="1">{{i18n_lang.siteList14}}</Option>
                <Option :value="0">{{i18n_lang.siteList22}}</Option>
            </Select>
        </FormItem>
        <FormItem  :label="i18n_lang.siteList23" prop="pay_behalf_level">
            <Select v-model="addForm.pay_behalf_level" style="width:200px">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
                <Option :value="3">3</Option>
            </Select>
        </FormItem>
        <FormItem :label="i18n_lang.siteList24" prop="pay_behalf_point">
          <Input v-model="addForm.pay_behalf_point"/>
        </FormItem>
        <FormItem :label="i18n_lang.siteList17" prop="is_collection_behalf">
            <Select v-model="addForm.is_collection_behalf" style="width:200px">
                <Option :value="1">{{i18n_lang.siteList14}}</Option>
                <Option :value="0">{{i18n_lang.siteList22}}</Option>
            </Select>
        </FormItem>
        <FormItem :label="i18n_lang.siteList8" prop="collection_pay_level">
            <Select v-model="addForm.collection_pay_level" style="width:200px">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
                <Option :value="3">3</Option>
            </Select>
        </FormItem>
        <FormItem :label="i18n_lang.siteList9" prop="collection_pay_point">
          <Input v-model="addForm.collection_pay_point"/>
        </FormItem>
        <FormItem :label="i18n_lang.siteList3" prop="order_complete_method">
            <Select v-model="addForm.order_complete_method" style="width:200px">
                <Option :value="0">{{i18n_lang.siteList25}}</Option>
                <Option :value="1">{{i18n_lang.siteList26}}</Option>
            </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="save">{{i18n_lang.siteList27}}</Button>
      </div>
    </Modal>


    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  let initData = {
    name: '',
    is_pay_behalf: 1,
    pay_behalf_level: 1,
    pay_behalf_point: '',
    is_collection_behalf: 1,
    collection_pay_level: 1,
    collection_pay_point: '',
    order_complete_method: 0
  }
  export default {
    data () {
      const i18n_lang = this.$t('siteList');
      return {
        loading: {
          page: 0,
          addBtn: false,
          ipBtn: false,
          password: false
        },
        visible: {
          addModel: false,
          password: false
        },
        i18n_lang,
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          page: 1
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
        stateList: [{ id: 1, name: i18n_lang.siteList14 }, { id: 0, name: i18n_lang.siteList15 }], // 状态数据
        addForm: {...initData},
        editType: 'add', // 修改类型
        addRuleValidate: {
            name: [{ required: true, message: i18n_lang.siteList28 }],
            // password: [{ required: true, message: i18n_lang.siteList28 }],
            // real_name: [{ required: true, message: i18n_lang.siteList28 }],
            // position: [{ required: true, message: i18n_lang.siteList28 }],
            // department: [{ required: true, message: i18n_lang.siteList28  }],
            // role_id: [{ required: true, message: i18n_lang.siteList28  }],
            // password_confirm: [
            //     { required: true, message: i18n_lang.siteList28  },
            //     {
            //         validator: (rule, value, cb) =>
            //         this.addForm.password === this.addForm.password_confirm ? cb() : cb(i18n_lang.siteList28)
            //     }
            // ]
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
            this.addForm.is_pay_behalf = row.is_pay_behalf
            this.addForm.pay_behalf_level = row.pay_behalf_level
            this.addForm.pay_behalf_point = row.pay_behalf_point
            this.addForm.is_collection_behalf = row.is_collection_behalf
            this.addForm.collection_pay_level = row.collection_pay_level
            this.addForm.collection_pay_point = row.collection_pay_point
            this.addForm.order_complete_method = row.order_complete_method
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
          url: `/merchant`,
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
          url: `/merchant/${id}`,
          method: 'PUT',
          data
        })
        if (res.state !== 0) {
          this.$Message.success(res.message)
        } else {
            this.visible.addModel = false
            this.$Message.success(this.i18n_lang.siteList29)
            this.getData()
        }
      },
  
      async getData () {
        this.loading.page++
        let query = {
          page: this.page.page,
          page_size: this.page.page_size,
        //   ...this.query
        }
        const res = await this.$axios.request({
          url: '/merchant',
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
    async handleStop(row, type){
        let data = {}
        if (type === 'pay') {
            data.is_pay_behalf = row.is_pay_behalf ? 0 : 1;
        } else {
            data.is_collection_behalf = row.is_collection_behalf ? 0 : 1;
        }
        let res = await this.$axios.request({
            url: `/merchant/${row.id}`,
            method: 'put',
            data
        })
        if (res.state !== 0) {
            this.$Message.error(res.message)
        } else {
            this.$Message.success(res.message)
            this.getData()
        }
    },
   
      // 删除
    //   async handleDelete (row) { 
    //     let res = await this.$axios.request({
    //       url: `/admin/${row.id}`,
    //       method: 'delete'
    //     })
    //     if (res.status !== 200) {
    //       this.$Message.error(res.message)
    //     } else {
    //       this.$Message.success(res.message)
    //       this.getData()
    //     }
    //   },
    //   reset () {
    //     this.query = {
    //       admin_name: '',
    //       status: ''
    //     }
    //     this.getData()
    //   },
      // 设置每页条数
      changepage_size (page_size) {
        this.page.page_size = page_size
        this.getData()
      },
      // 翻页
      changePage (val) {
        this.page.page = val
        this.getData()
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