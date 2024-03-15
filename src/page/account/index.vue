<template>
    <div id="Account">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>{{i18n_lang.systemCcountList14}}</span>
            <Input v-model="query.admin_name" style="width:120px;"/>
          </div>
          <div class="item">
            <span>{{i18n_lang.systemCcountList5}}</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>{{i18n_lang.systemCcountList15}}</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div>
          <div class="query_btns">
            <Button type="primary" v-auth="21" @click="getData(1)">{{i18n_lang.systemCcountList16}}</Button>
            <Button type="primary" v-auth="21"  @click="reset">{{i18n_lang.systemCcountList17}}</Button>
          </div>
        </div>
        <Button type="primary" v-auth="23" @click="addAccount('add')">{{i18n_lang.systemCcountList18}}</Button>
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
      :title="editType === 'add' ? i18n_lang.systemCcountList19 : i18n_lang.systemCcountList10"
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
        <FormItem :label="i18n_lang.systemCcountList0" prop="admin_name">
          <Input v-model="addForm.admin_name" :disabled="editType === 'edit'"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="i18n_lang.systemCcountList20" prop="password">
          <Input v-model="addForm.password"/>
        </FormItem>
        <FormItem v-if="editType === 'add'" :label="i18n_lang.systemCcountList21" prop="password_confirm">
          <Input v-model="addForm.password_confirm"/>
        </FormItem>
        <FormItem :label="i18n_lang.systemCcountList1" prop="real_name">
          <Input v-model="addForm.real_name"/>
        </FormItem>
        <FormItem :label="i18n_lang.systemCcountList22" prop="position">
          <Input v-model="addForm.department"/>
        </FormItem>
        <FormItem :label="i18n_lang.systemCcountList23" prop="department">
          <Input v-model="addForm.position"/>
        </FormItem>

        <FormItem :label="i18n_lang.systemCcountList31" prop="user_type">
            <RadioGroup v-model="addForm.user_type" >
              <Radio label="1" :disabled="editType !=='add'?true:false">
                  <span>{{i18n_lang.systemCcountList32}}</span>
              </Radio>
              <Radio label="2" :disabled="editType !=='add'?true:false">
                  <span>{{i18n_lang.systemCcountList33}}</span>
              </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="i18n_lang.systemCcountList34" v-if="addForm.user_type==2" prop="merchant_id">
            <Select v-model="addForm.merchant_id" style="width:100px" :disabled="editType !=='add'?true:false">
                <Option :value="item.id" v-for="(item,i) in merchantList" :key="i">{{item.name}}</Option>
            </Select>
        </FormItem>

        <FormItem :label="i18n_lang.systemCcountList24" prop="role_id">
          <MoreOptionCheck
            v-model="addForm.role_id"
            :option-data="roleList"
            option-label="role_name"
            option-key="id"
            is-single
            v-if="addForm.user_type==1"
          ></MoreOptionCheck>
          <Input v-if="addForm.user_type==2" value="商户" disabled />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="save">{{i18n_lang.systemCcountList25}}</Button>
      </div>
    </Modal>

    <!-- 改密 -->
    <Modal v-model="visible.password" :title="i18n_lang.systemCcountList11" :width="500">
      <Spin v-if="loading.password" size="large" fix></Spin>
          <Form
            ref="pwInfo"
            :model="pwInfo"
            :label-width="100"
            :rules="PwRuleValidate"
          >
            <FormItem :label="i18n_lang.systemCcountList26" prop="password">
              <Input v-model="pwInfo.password"/>
            </FormItem>
            <FormItem :label="i18n_lang.systemCcountList21" prop="password_confirm">
              <Input v-model="pwInfo.password_confirm"/>
            </FormItem>
          </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.password" @click="changePw">{{i18n_lang.systemCcountList27}}</Button>
      </div>
    </Modal>

    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import MoreOptionCheck from '../../components/MoreOptionCheck'
  // import { computeDay } from '@/helper/tool/handleDate'
  let initData = {
    admin_name: '', // 账号
    password: '', // 密码
    password_confirm: '', // 重复密码
    real_name: '', // 姓名
    position: '', // 部门
    department: '', // 职位
    role_id: [], // 权限
    user_type:"1"
  }
  const initPw = {
    id: '',
    password: '',
    password_confirm: '',
  }
  export default {
    components: {
      MoreOptionCheck
    },
    data () {
      const i18n_lang = this.$t('systemCcountList');
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
        merchantList:[], //商户列表
        dataValue: [, ], // 默认日期
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() - 86400000
          }
        },
        roleList: [],
        stateList: [{ id: 1, name: i18n_lang.systemCcountList7 }, { id: 0, name: i18n_lang.systemCcountList8 }], // 状态数据
        addForm: {...initData},
        editType: 'add', // 修改类型
        addRuleValidate: {
            admin_name: [{ required: true, message: i18n_lang.systemCcountList28 }],
            password: [{ required: true, message: i18n_lang.systemCcountList28  }],
            real_name: [{ required: true, message: i18n_lang.systemCcountList28  }],
            position: [{ required: true, message: i18n_lang.systemCcountList28  }],
            department: [{ required: true, message: i18n_lang.systemCcountList28  }],
            role_id: [{ required: true, message:i18n_lang.systemCcountList28  }],
            user_type:[{ required: true, message:i18n_lang.systemCcountList28  }],
            merchant_id:[{ required: true, message:i18n_lang.systemCcountList35  }],
          
            password_confirm: [
                { required: true, message: i18n_lang.systemCcountList28  },
                {
                    validator: (rule, value, cb) =>
                    this.addForm.password === this.addForm.password_confirm ? cb() : cb(i18n_lang.systemCcountList28)
                }
            ]
        },
        pwInfo: { ...initPw },
        PwRuleValidate: {
            password: [{ required: true, message:  i18n_lang.systemCcountList28}],
            password_confirm: [
            { required: true, message: i18n_lang.systemCcountList28},
            {
                validator: (rule, value, cb) =>
                this.pwInfo.password === this.pwInfo.password_confirm ? cb() : cb(i18n_lang.systemCcountList29)
            }
            ]
        },
      }
    },
    created () {
      this.getMerchantList(); //获取商户列表
      this.getData()
      this.getRole()
    },
    methods: {
      
      // 添加用户弹框
      async addAccount (type) {
        this.editType = type
        this.visible.addModel = true
        this.addForm = Object.assign({}, initData)
      },
      // 保存用户信息
      async save () {
        if(this.editType === 'add') {
          if(this.addForm.user_type==2 && this.addForm.role_id.length==0){ //判断是否为商户，
            this.addForm.role_id=[18];
          }
        }
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
      // 新增接口
      async add () {
        const { role_id, ...rest } = this.addForm;
        rest.user_type=parseInt(rest.user_type);

       


        let res = await this.$axios.request({
          url: `/admin`,
          method: 'post',
          data: {
            ...rest,
            role_id: role_id[0]
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
        const { id, real_name, position, department, role_id } = this.addForm;
        const res = await this.$axios.request({
          url: `/admin/${id}`,
          method: 'PUT',
          data: {
            real_name,
            position,
            department,
            role_id: role_id[0]
          }
        })

        if (res.state !== 0 ) {
          this.$Message.error(res.message)
          return
        }
        this.visible.addModel = false
        this.$Message.success(this.i18n_lang.systemCcountList30)
        this.getData()
      },
  
      // 改密接口
      async changePw() {
        this.$refs['pwInfo'].validate(async valid => {
            if (!valid) return
            let res = await this.$axios.request({
              url: `/admin/${this.pwInfo.id}`,
              method: 'patch',
              data: {
                ...this.pwInfo
              }
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
            } else {
              this.$Message.success(res.message)
              this.visible.password = false
              this.getData()
            }
        })
       
      },
      async getData (i) {
        if (i) this.page.currentPage = i;
        this.loading.page++
        let query = {
          page: this.page.currentPage,
          page_size: this.page.page_size,
          ...this.query
        }
        const res = await this.$axios.request({
          url: '/admin',
          method: 'get',
          params: query
        })
        if (res.state !== 0) {
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
      //商户列表
      async getMerchantList(){
          const res = await this.$axios.request({
              url: '/merchant/tree',
              method: 'GET',
              })
              if (res.status !== 200 || res.state !== 0) {
              this.$msg({
                  type: 'error',
                  message: res.message
              })
              return
          }
          this.merchantList=res.data
      },
      // 获取所有管理员角色
      async getRole () {
        let res = await this.$axios.request({
            url: `/admin/role`,
            method: 'get',
            params: {
                page: 1,
                page_size: 100,
            }
        })
        if (res.state !== 0) {
          this.$Message.error(res.message )
          return
        }
        if (res.data.length) {
            this.roleList = res.data
        }
      },
      // 启用停用
      async handleStop(row){
      let res = await this.$axios.request({
        url: `/admin/status/${row.id}`,
        method: 'put',
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getData()
      }
    },
  
      // 编辑/改密
      async handleEdit (row, type) {
        if (type === 'password') {
            this.visible.password = true
            this.pwInfo = { ...initPw }
            this.pwInfo.id = row.id
        } else {
            this.editType = type
            this.visible.addModel = true
            this.addForm = Object.assign({}, initData)
            this.addForm.id = row.id
            this.addForm.admin_name = row.admin_name
            this.addForm.real_name = row.real_name
            this.addForm.position = row.position
            this.addForm.department = row.department
            this.addForm.role_id = [row.admin_role_relation.id]
            this.addForm.merchant_id=row.merchant_id;

            if(row.merchant_id==null){
              this.addForm.user_type="1";
            }else{
              this.addForm.user_type="2";
             
            }
            
        }
      },  
      // 删除
      async handleDelete (row) { 
        let res = await this.$axios.request({
          url: `/admin/${row.id}`,
          method: 'delete'
        })
        if (res.state !== 0) {
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
        this.page.page = val
        this.getData()
      },
      // 选择日期
      handleChangeDate (val) {
        [this.query.start_date, this.query.end_date] = val
      },
      chnageLimitRecharge(val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>
  </style>