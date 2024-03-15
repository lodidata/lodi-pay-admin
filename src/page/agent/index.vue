<template>
    <div id="Agent">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>代理账号</span>
            <Input v-model="query.agent_code" style="width:120px;"/>
          </div>
          <div class="item">
            <span>品牌名称</span>
            <Input v-model="query.brand_name" style="width:120px;"/>
          </div>
          <div class="item">
            <span>开通时间</span>
            <DatePicker type="daterange" placement="bottom-end" style="width: 200px" :options="options"
            @on-change="handleChangeDate"
            v-model="dataValue" />
          </div>
          <!-- <div class="item">
            <span>状态</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>全部</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div> -->
          <div class="query_btns">
            <Button type="primary" @click="getData(1)">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
          </div>
        </div>
        <Button type="primary" @click="addMember('add')">新增</Button>
      </Card>
      <div style="marginTop:30px">
        <Table :columns="columns" :data="dataSource" border></Table>
        <Page
          class="page_box"
          :current="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          placement="top"
        ></Page>
      </div>
      <!-- 新增/编辑 -->
      <Modal
        :title="`${editType == 'add'?'新增账号':'编辑账号'}`"
        v-model="visible.addModel"
        :width="700"
        :mask-closable="false"
        @on-cancel="visible.addModel = false"
      >
        <Form v-if="visible.addModel" :model="addForm" ref="addForm" :rules="ruleValidateAdd">
            <FormItem label="代理账号" :label-width="80" prop="agent_code" v-if="editType === 'add'||editType ==='edit'">
                <Input v-model="addForm.agent_code" :disabled="true" placeholder="系统自动生成"/>
            </FormItem>
            <FormItem label="品牌名称" :label-width="80" prop="brand_name" v-if="editType === 'add'||editType ==='edit'">
                <Input v-model="addForm.brand_name" placeholder="请输入"/>
            </FormItem>
            <FormItem label="网站" :label-width="80" prop="site_url" v-if="editType === 'add'||editType ==='edit'">
                <Input v-model="addForm.site_url" placeholder="请输入"/>
            </FormItem>
            <FormItem label="回调地址" :label-width="80" prop="callback_url" v-if="editType === 'add'||editType ==='edit'">
                <Input v-model="addForm.callback_url" placeholder="请输入"/>
            </FormItem>
            <FormItem label="账单日期" :label-width="80" prop="bill_date" v-if="editType === 'add'||editType ==='edit'">
                <DatePicker type="date" v-model="addForm.bill_date" placeholder="Select date" style="width: 200px" />
            </FormItem>
            <FormItem label="是否允许登录注册" :label-width="120" prop="is_allow_login" v-if="editType === 'add'||editType ==='edit'">
                <RadioGroup v-model="addForm.is_allow_login">
                    <Radio :label="1">允许</Radio>
                    <Radio :label="0">不允许</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否允许转账" :label-width="120" prop="is_allow_transfer" v-if="editType === 'add'||editType ==='edit'">
                <RadioGroup v-model="addForm.is_allow_transfer">
                    <Radio :label="1">允许</Radio>
                    <Radio :label="0">不允许</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否允许注单" :label-width="120" prop="is_allow_order" v-if="editType === 'add'||editType ==='edit'">
                <RadioGroup v-model="addForm.is_allow_order">
                  <Radio :label="1">允许</Radio>
                  <Radio :label="0">不允许</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="状态" :label-width="120" prop="status" v-if="editType === 'add'||editType ==='edit'">
                <RadioGroup v-model="addForm.status">
                  <Radio :label="1">开启</Radio>
                  <Radio :label="0">关闭</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否限制金额" :label-width="120" prop="is_limit_recharge" v-if="editType === 'add'||editType ==='edit'">
                <RadioGroup v-model="addForm.is_limit_recharge" @on-change="chnageLimitRecharge">
                    <Radio :label="1">允许</Radio>
                    <Radio :label="0">不允许</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="限制转入金额" :label-width="120" prop="limit_recharge_money" v-if="editType === 'add'||editType ==='edit'">
                <Input v-model="addForm.limit_recharge_money" :disabled="addForm.is_limit_recharge !== 1 ? true : false" placeholder="请输入" />
            </FormItem>

        </Form>
  
        <div slot="footer">
          <Button type="primary" :loading="loading.addBtn" @click="save">确认</Button>
        </div>
      </Modal>

      <!-- ip加白 -->
        <!-- <Modal
            :title="`${'IP编辑'}`"
            v-model="visible.ipModel"
            :width="450"
            @on-cancel="visible.ipModel = false"
        >
            <Form :model="ipForm" ref="ipForm"  :label-width="60" :rules="ruleValidateIp">
                <FormItem label="IP地址" prop="ip">
                    <Input v-model="ipForm.ip" placeholder="请输入代理账号"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" :loading="loading.ipBtn" @click="saveIp">确认</Button>
            </div>
        </Modal> -->

    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import MoreOptionCheck from '../../components/MoreOptionCheck'
  // import { computeDay } from '@/helper/tool/handleDate'
  let initData = {
    agent_code: '',
    brand_name: '',
    site_url: '',
    callback_url: '',
    bill_date: '',
    is_allow_login: 1,
    is_allow_transfer: 1,
    is_allow_order: 1,
    is_limit_recharge: 1,
    limit_recharge_money: '',
    status: 1,
  }
  export default {
    components: {
      MoreOptionCheck
    },
    data () {
      return {
        loading: {
          page: 0,
          addBtn: false,
          ipBtn: false
        },
        visible: {
          addModel: false,
          ipModel: false
        },
        columns: columns(this),
        dataSource: [],
        page: {
          pageSize: 10,
          total: 0,
          currentPage: 1
        },
        query: {
          agent_code: '',
          brand_name: '',
          // opening_date_from: computeDay(-1),
          // opening_date_to: computeDay(-1),
          opening_date_from: '',
          opening_date_to: '',

        },
        dataValue: ['', ''], // 默认日期
        options: {
          disabledDate (date) {
            // return date && date.valueOf() > Date.now() - 86400000
            return date && date.valueOf() > Date.now()
          }
        },
        roleList: [],
        stateList: [{ id: 1, name: '启用' }, { id: 0, name: '停用' }], // 状态数据
        addForm: {},
        editType: 'add', // 修改类型
        ruleValidateAdd: {
          // agent_code: [{ required: true, message: '请输入'}],
          brand_name: [{required: true, message: '请输入'}],
          // bill_date: [{required: true, message: '请输入'}],
          // password: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
          // password_confirm: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
          // role: [{ required: true, message: '请选择角色' }]
        },
        ipForm: {
            ip: ''
        },
        ruleValidateIp: {
            ip: [{ required: true, message: '请输入6-16正确的ip地址', min: 6, max: 16 }],
        }
      }
    },
    created () {
      this.getData()
      if (!this.roleList.length) {
        this.loading.addBtn = true
        this.loading.addBtn = false
      }
    },
    methods: {
      // 添加用户弹框
      async addMember (type) {
        this.editType = type
        this.visible.addModel = true
        this.addForm = Object.assign({}, initData)
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
      checkPassWord () {
        let state = true
        if (this.addForm.password !== this.addForm.password_confirm) {
          state = false
        }
        return state
      },
      // 新增接口
      async add () {
        let res = await this.$axios.request({
          url: `/agent`,
          method: 'post',
          data: {
            ...this.addForm,
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
        const { id, brand_name, site_url, callback_url, bill_date, is_allow_login, is_allow_transfer, is_allow_order, is_limit_recharge, limit_recharge_money, status} = this.addForm;
        const res = await this.$axios.request({
          url: `/agent/${id}`,
          method: 'PUT',
          data: {
            brand_name,
            site_url,
            callback_url,
            bill_date,
            is_allow_login,
            is_allow_transfer,
            is_allow_order,
            is_limit_recharge,
            limit_recharge_money,
            status
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

      // 修改状态
      async handleStatus(row, type) {
        const res = await this.$axios.request({
          url: `/agent/${row.id}`,
          method: 'PATCH',
          data: {
            type
          }
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          this.getData()
        }
      },
  
      // 改密接口
      // async update () {
      //   if (!this.checkPassWord()) {
      //     this.$Message.warning('两次输入密码不一致')
      //     return
      //   }
      //   let res = await this.Fetch(`/admin/user/${this.addForm.id}`, {
      //     method: 'PATCH',
      //     body: {
      //       name: this.addForm.name,
      //       password: this.addForm.password
      //     }
      //   })
      //   if (res.status !== 200) {
      //     this.$Message.error(res.message)
      //   } else {
      //     this.visible.addModel = false
      //     this.getData()
      //   }
      // },
      async getData (i) {
        if (i) this.page.currentPage = i;
        this.loading.page++
        let query = {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.query
        }
        const res = await this.$axios.request({
          url: '/agent',
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
      // 启用停用
      // async handleSwitch (row) {
      //   let status = row.status === 1 ? 0 : 1
      //   let res = await this.Fetch(`/admin/user/status/${row.id}`, {
      //     method: 'PUT',
      //     body: {
      //       status: status
      //     }
      //   })
      //   if (res.status !== 200) {
      //     this.$Message.error(res.message)
      //   } else {
      //     this.$Message.success(res.message)
      //     this.getData()
      //   }
      // },

    //   修改ip
    // saveIp() {
    //     this.loading.ipBtn = true
    //     this.$refs['ipForm'].validate(async valid => {
    //         this.loading.ipBtn = false
    //         if (valid) {
    //             this.visible.ipModel = false;
    //         }
    //     })
    // },
  
      // 编辑/改密
      async handleEdit (row, type) {
        if (type === 'ip') {
            // this.ipForm.ip = row.name;
            // this.visible.ipModel = true;
            // 打开ip
            this.$router.push({
                path: `agent/ip`,
                query: {
                    agent_code: row.agent_code
                }
            })
        } else if (type === 'open') {
            // 打开代理游戏
            this.$router.push({
                path: `agent/game`,
                query: {
                  agent_code: row.agent_code
                }
            })
        } else {
            this.editType = type
            this.visible.addModel = true
            this.addForm = Object.assign({}, row)
            // this.addForm.role = [row.role_id]
            // if (!row.role_id) this.addForm.role = []
        }
      },  
      // 删除
      // async handleDelete (row) {
      //   let res = await this.$axios.request({
      //     url: `/admin/user/${row.id}`,
      //     method: 'delete'
      //   })
      //   if (res.status !== 200) {
      //     this.$Message.error(res.message)
      //   } else {
      //     this.$Message.success(res.message)
      //     this.getData()
      //   }
      // },
      reset () {
        this.query = {
          name: '',
          status: ''
        }
        this.page = {
          pageSize: 10,
          total: 0,
          currentPage: 1
        }
        this.dataValue = ['', ''];
        this.getData()
      },
      // 设置每页条数
      changePageSize (pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      // 翻页
      changePage (val) {
        this.page.currentPage = val
        this.getData()
      },
      // 选择日期
      handleChangeDate (val) {
        [this.query.opening_date_from, this.query.opening_date_to] = val
      },
      chnageLimitRecharge(val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>
  </style>
  