<template>
  <div id="Account">
    <Spin fix v-if="loading.page"></Spin>
    <date-more :dates.sync="created_at" :title="i18n_lang.merchant27"></date-more>

    <Card dis-hover class="query_box">
      <div class="query_con mb30">

        <div class="item">
          <span>{{ i18n_lang.merchant24 }}</span>
          <Input v-model="query.name" style="width:120px;" :placeholder="i18n_lang.merchant30" />
        </div>
        <div class="item">
          <span>{{ i18n_lang.merchant25 }}</span>
          <Select v-model="query.is_pay_behalf" style="width:100px">
            <Option value>{{ i18n_lang.merchant31 }}</Option>
            <Option :value="item.id" v-for="(item, i) in payList" :key="i">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{ i18n_lang.merchant26 }}</span>
          <Select v-model="query.is_collection_behalf" style="width:100px">
            <Option value>{{ i18n_lang.merchant31 }}</Option>
            <Option :value="item.id" v-for="(item, i) in collectionList" :key="i">{{ item.name }}</Option>
          </Select>
        </div>
        
        <div class="query_btns">
          <Button type="primary" v-auth="2" @click="getData(1)">{{ i18n_lang.merchant28 }}</Button>
          <Button type="primary" v-auth="2" @click="reset">{{ i18n_lang.merchant29 }}</Button>
        </div>
      </div>
      <Button type="primary" v-auth="6" @click="handle('add')">{{ i18n_lang.merchant1 }}</Button>
    </Card>
    <div style="marginTop:30px">
      <Table :columns="columns" :data="dataSource" border></Table>
      <Page class="page_box" :current="page.currentPage" :page-size="page.page_size" :total="page.total" show-sizer
        @on-change="getData" @on-page-size-change="changepage_size" placement="top"></Page>
    </div>

    <!-- 新增/编辑 -->
    <!-- 新增 `${editType === 'add' ? '新增' : '编辑'}管理员`-->
    <Modal v-model="visible.addModel" :mask-closable="false"
      :title="editType === 'add' ? `${i18n_lang.merchant1}` : `${i18n_lang.merchant2}`" :width="500"
      @on-cancel="visible.addModel = false">
      <Spin v-if="loading.add" size="large" fix></Spin>
      <Form v-if="visible.addModel" ref="addForm" :model="addForm" :label-width="140" :rules="addRuleValidate">
        <FormItem :label="i18n_lang.merchant3" prop="name">
          <Input v-model="addForm.name" />
        </FormItem>
        <FormItem :label="i18n_lang.merchant4" prop="is_pay_behalf">
          <Select v-model="addForm.is_pay_behalf" style="width:200px">
            <Option :value="1">{{ i18n_lang.merchant13 }}</Option>
            <Option :value="0">{{ i18n_lang.merchant14 }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant5" prop="pay_behalf_level">
          <Select v-model="addForm.pay_behalf_level" style="width:200px">
            <Option :value="1">1</Option>
            <Option :value="2">2</Option>
            <Option :value="3">3</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant6" prop="pay_behalf_point">
          <Input v-model="addForm.pay_behalf_point" min="0" max="100" />
        </FormItem>
        <FormItem :label="i18n_lang.merchant15" prop="is_collection_behalf">
          <Select v-model="addForm.is_collection_behalf" style="width:200px">
            <Option :value="1">{{ i18n_lang.merchant13 }}</Option>
            <Option :value="0">{{ i18n_lang.merchant14 }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant7" prop="collection_pay_level">
          <Select v-model="addForm.collection_pay_level" style="width:200px">
            <Option :value="1">1</Option>
            <Option :value="2">2</Option>
            <Option :value="3">3</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant8" prop="collection_pay_point">
          <Input v-model="addForm.collection_pay_point" />
        </FormItem>
        <FormItem :label="i18n_lang.merchant9" prop="order_complete_method">
          <Select v-model="addForm.order_complete_method" style="width:200px">
            <Option :value="0">{{ i18n_lang.merchant10 }}</Option>
            <Option :value="1">{{ i18n_lang.merchant11 }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant22" prop="ip_white_list">
          <Input style="margin-bottom: 10px;" v-model="addForm.ip_white_list" />
          <div>{{ i18n_lang.merchant23 }}</div>
        </FormItem>
        <FormItem :label="i18n_lang.merchant35" prop="currency_id" v-if="this.editType === 'add'">
          <Select v-model="addForm.currency_id" style="width:200px">
            <Option :value="item.id" v-for="item in currency" :key="item.id">{{ item.currency_type }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.merchant54" prop="recharge_waiting_limit">
          <Input style="margin-bottom: 10px;" v-model="addForm.recharge_waiting_limit"  :disabled="editType === 'edit'"/>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="save">{{ i18n_lang.merchant12 }}</Button>
      </div>
    </Modal>


    <!-- 代付钱包 -->
    <Modal v-model="visible.payModel" :mask-closable="false" :title="`${i18n_lang.merchant32}`" :width="500"
      @on-cancel="visible.payModel = false">
      <Tabs size="small" @on-click="onChange">
        <Tab-pane :label="i18n_lang.merchant36" name="1">
          <Form v-if="visible.payModel" ref="payForm" :model="payForm" :label-width="100" :rules="payRuleValidate">
            <FormItem :label="`${i18n_lang.merchant37}`" prop="transfer_balance">
              <Input v-model="payForm.transfer_balance" :disabled="true" />
            </FormItem>
            <FormItem :label="`${i18n_lang.merchant38}`" prop="amount">
              <Input v-model="payForm.amount" type="number" />
            </FormItem>

          </Form>
        </Tab-pane>
        <Tab-pane :label="i18n_lang.merchant4" name="0">
          <Form v-if="visible.payModel" ref="payForms" :model="payForm" :label-width="100" :rules="payRuleValidates">
            <FormItem :label="`${i18n_lang.merchant33}`" prop="transfer_balance">
              <Input v-model="payForm.transfer_balance" :disabled="true" />
            </FormItem>
            <FormItem :label="`${i18n_lang.merchant34}`" prop="amounts">
              <Input v-model="payForm.amounts" type="number" />
            </FormItem>
          </Form>
        </Tab-pane>
      </Tabs>

      <div slot="footer">
        <Button :loading="loading.pay" @click="onCancale">{{ i18n_lang.merchan1t1 }}</Button>
        <Button type="primary" :loading="loading.pay" @click="savePay">{{ i18n_lang.merchant12 }}</Button>
      </div>
    </Modal>

    <!-- 钱包设置 -->
    <Modal v-model="visible.setModel" :mask-closable="false" :title="`${i18n_lang.merchant43}`" :width="500"
      @on-cancel="visible.setModel = false">


      <Form v-if="visible.setModel" ref="setForm" :model="setForm" :label-width="100" :rules="setFormRuleValidate">
        <FormItem :label="`${i18n_lang.merchant44}`">
          <Switch v-model="setForm.status" @on-change="onStatus"></Switch>
        </FormItem>
        <FormItem :label="`${i18n_lang.merchant45}`" v-show="setForm.status">
          <Input v-model="setForm.amount" type="number" @keyup.native="number" />
        </FormItem>
        <FormItem :label="`${i18n_lang.merchant45}`" v-show="!setForm.status">
          <Input v-model="setForm.amounts" type="number" @keyup.native="numbers" />
        </FormItem>
      </Form>



      <div slot="footer">
        <Button :loading="loading.set" @click="onSetCancale">{{ i18n_lang.merchan1t1 }}</Button>
        <Button type="primary" :loading="loading.set" @click="saveSet">{{ i18n_lang.merchant12 }}</Button>
      </div>
    </Modal>


  </div>
</template>
  
<script>
import {formatDateToString} from '@/libs/date'

import columns from './columns.js'
let initData = {
  name: '',
  is_pay_behalf: 1,
  pay_behalf_level: 1,
  pay_behalf_point: '',
  is_collection_behalf: 1,
  collection_pay_level: 1,
  collection_pay_point: '',
  order_complete_method: 0,
  currency_id: '',
  ip_white_list: '',
  recharge_waiting_limit: 0
}
const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }
let initPayData = {
  merchant_id: '',
  transfer_balance: 0,
  amount: '',
}
const NUMBER_REG_GT0 = /^\+?[0-9][0-9]*$/

export default {
  data() {
    const validateName = (rule, value, callback) => {
      let name = Number(value)
      if (name < 0 || name > 100) {
        callback(new Error(i18n_lang.merchant41))
      }
      callback()
    }

    const i18n_lang = this.$t('merchant');
    return {
      name: '1',
      currency: '',
      currency: [],
      i18n_lang: i18n_lang,
      loading: {
        set: false,
        page: 0,
        addBtn: false,
        ipBtn: false,
        password: false,
        pay: false
      },
      visible: {
        setModel: false,
        addModel: false,
        password: false,
        payModel: false
      },
      columns: columns(this),
      dataSource: [],
      page: {
        page_size: 10,
        total: 0,
        currentPage: 1
      },
      query: {

        name: '',
        is_pay_behalf: '',
        is_collection_behalf: '',
      
      },
      created_at: [initDate.from,initDate.to],
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      row: null,
      roleList: [],
      payList: [{ id: 1, name: i18n_lang.merchant13 }, { id: 0, name: i18n_lang.merchant14 }], // 状态数据
      collectionList: [{ id: 1, name: i18n_lang.merchant13 }, { id: 0, name: i18n_lang.merchant14 }], // 状态数据
      addForm: { ...initData },
      editType: 'add', // 修改类型
      addRuleValidate: {
        name: [{ required: true, message: i18n_lang.merchant56 }],
        pay_behalf_point: [{ required: true, message: i18n_lang.merchant57 },

        { validator: validateName, trigger: 'blur' }],
        collection_pay_point: [{ required: true, message: i18n_lang.merchant58 }],

        // password: [{ required: true, message: '请输入'  }],
        // real_name: [{ required: true, message: '请输入'  }],
        // position: [{ required: true, message: '请输入'  }],
        // department: [{ required: true, message: '请输入'  }],
        // role_id: [{ required: true, message: '请输入'  }],
        // password_confirm: [
        //     { required: true, message: '请输入'  },
        //     {
        //         validator: (rule, value, cb) =>
        //         this.addForm.password === this.addForm.password_confirm ? cb() : cb('请输入')
        //     }
        // ]
        ip_white_list: [{ required: true, message: i18n_lang.merchant59 }],
        currency_id: [{ required: true, message: i18n_lang.merchant60 }],
        recharge_waiting_limit: [{
          required: true,
          validator: (rule, value, cb) => {
            value = value.toString()
            if (value) {
              //判断是整数
              if (!NUMBER_REG_GT0.test(value)) {
                return cb(i18n_lang.merchant55)
              }
            } else {
              return cb()
            }
            return cb()
          }
        }],
      },
      setForm: {
        merchant_account: '',
        currency: '',
        status: false,
        amounts: '',
        amount: ''
      },
      setFormRuleValidate: {

        amount: [{ required: true, message: i18n_lang.merchant16 }, {
          pattern: /^[1-9]\d*$/,
          message: i18n_lang.accountList35,
          trigger: 'blur',
        }],
      },
      payForm: {
        merchant_id: '',
        transfer_balance: 0,
        amount: '',
      },
      payRuleValidate: {
        amount: [{ required: true, message: i18n_lang.merchant16 }],
      },
      payRuleValidates: {
        amounts: [{ required: true, message: i18n_lang.merchant16 }],
      }
    }
  },
  created() {
    this.getData()
    this.addcurrency()
    ///currency
    //   this.getRole()
  },
  methods: {
    number() {

      this.setForm.amount = this.setForm.amount.replace(/[^\.\d]/g, '');

      this.setForm.amount = this.setForm.amount.replace('.', '');

    },
    numbers() {

      this.setForm.amounts = this.setForm.amounts.replace(/[^\.\d]/g, '');

      this.setForm.amounts = this.setForm.amounts.replace('.', '');

    },
    onStatus(val) {
      if (!val) {
        this.setForm.amounts = this.setForm.amount

      } else {
        this.setForm.amount = this.setForm.amounts
      }
    },
    // 新增接口
    async addcurrency() {

      let res = await this.$axios.request({
        url: `/currency`,
        method: 'get',

      })

      if (res.state !== 0 ) {
        this.$Message.error(res.message)

      } else {
        this.currency = res.data
      }
    },
    // 添加用户弹框
    async handle(type) {
      this.editType = type
      this.visible.addModel = true
      this.addForm = Object.assign({}, initData)
    },
    // 编辑/改密
    async handleEdit(row, type) {
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
        this.addForm.ip_white_list = row.ip_white_list
        this.addForm.recharge_waiting_limit = row.recharge_waiting_limit
      }
    },
    //删除
    async handleDelete(row){

      let res = await this.$axios.request({
        url: `/merchant/${row.id}`,
        method: 'DELETE',
      })
        if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
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
          }
        }
      })
    },
    // 新增接口
    async add() {
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
    async editData() {
      // const role = this.addForm.role
      const { id, ...data } = this.addForm;
      delete data.currency_id
      const res = await this.$axios.request({
        url: `/merchant/${id}`,
        method: 'PUT',
        data
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.visible.addModel = false
        this.$Message.success(res.message)
        this.getData()
      }
    },
    handleSet(row) {
      const { pay_balance, account } = row
      if (pay_balance.length) {
        this.setForm.currency = pay_balance[0].currency

      }
      this.setForm.merchant_account = account
      this.row = row
      this.visible.setModel = true
    },
    handlePay(row) {
      this.row = row
      this.payForm = Object.assign({}, initPayData)
      const { collection_balance, pay_balance, account } = row
      console.log('this.name', this.name)
      if (this.name == '1') {
        if (collection_balance.length) {
          this.currency = collection_balance[0].currency
          this.payForm.transfer_balance = this.row.collection_balance[0].balance
        }

      } else {
        if (pay_balance.length) {
          this.currency = pay_balance[0].currency
          this.payForm.transfer_balance = this.row.pay_balance[0].balance
        }
      }
      this.payForm.account = account

      this.visible.payModel = true
    },
    onCancale() {

      this.payForm.transfer_balance = ''
      this.visible.payModel = false
    },
    onSetCancale() {
      this.setForm.status = false
      this.setForm.amount = ''
      this.visible.setModel = false
    },
    onChange(v) {
      this.name = v

      if (v == '1') {
        this.payForm.transfer_balance = this.row.collection_balance[0].balance
      } else {
        this.payForm.transfer_balance = this.row.pay_balance[0].balance
      }

    },
    async saveSet() {

      if (this.setForm.status && this.setForm.amount === '') {
        this.$Message.warning(this.i18n_lang.merchant16)
        return
      }
      if (!this.setForm.status && this.setForm.amounts === '') {
        this.$Message.warning(this.i18n_lang.merchant16)
        return
      }
      this.loading.set = true
      const res = await this.$axios.request({
        url: '/merchant/autoCharge',
        method: 'put',
        data: {
          merchant_account: this.setForm.merchant_account,
          amount: this.setForm.status ? this.setForm.amount : this.setForm.amounts,
          currency: this.setForm.currency,
          is_auto: this.setForm.status ? 1 : 0
        }
      })
      this.loading.set = false
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.setForm.status = false
        this.setForm.amount = ''
        this.setForm.amounts = ''
        this.visible.setModel = false
        this.$Message.success(res.message)
        this.getData()
      }


    },

    savePay() {

      this.loading.pay = true
      if (this.name == '1') {
        this.$refs['payForm'].validate(async valid => {
          this.loading.pay = false
          if (valid) {
            const res = await this.$axios.request({
              url: '/merchant/balance',
              method: 'put',
              data: {
                type: this.name,
                currency: this.currency,
                merchant_account: this.payForm.account,
                amount: this.name == '1' ? this.payForm.amount : this.payForm.amounts
              }
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
            } else {

              this.payForm.amount = ''
              this.payForm.amounts = ''
              this.payForm.transfer_balance = ''
              this.visible.payModel = false
              this.$Message.success(res.message)
              this.getData()
            }
          }
        })
      } else {
        this.$refs['payForms'].validate(async valid => {
          this.loading.pay = false
          if (valid) {
            const res = await this.$axios.request({
              url: '/merchant/balance',
              method: 'put',
              data: {
                type: this.name,
                currency: this.currency,
                merchant_account: this.payForm.account,
                amount: this.name == '1' ? this.payForm.amount : this.payForm.amounts
              }
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
            } else {
              this.payForm.amount = ''
              this.payForm.amounts = ''
              this.payForm.transfer_balance = ''
              this.visible.payModel = false
              this.$Message.success(res.message)
              this.getData()
            }
          }
        })
      }



    },

    async getData(i = 1) { 
      this.page.currentPage = i
     
      this.loading.page++
      let arr = []
      let m,y;
      if(this.created_at[0]!='') {
       
         m = formatDateToString(new Date(this.created_at[0]))+' 00:00:00'
         y = formatDateToString(new Date(this.created_at[1]))+' 23:59:59'
         arr = [m,y]
      } else {
        arr = []
      }
      let query = {
        page: this.page.currentPage,
        page_size: this.page.page_size,
        created_at: arr,
        ...this.query
      }
      const res = await this.$axios.request({
        url: '/merchant',
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
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0;

      /*
      res.data[0].financial.payment_num=10;
      res.data[0].financial.payment_total=15;
      res.data[0].financial.trial_num=2;
      res.data[0].financial.recharge_num=10;
      res.data[0].financial.recharge_total=1;
      */

      this.dataSource = res.data
      this.loading.page--
    },
    // 启用停用
    async handleStop(row, type) {
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
    // 设置每页条数
    changepage_size(page_size) {
      this.page.page_size = page_size
      this.getData()
    },
    
    reset() {
      this.query = {
        id: '',
        name: '',
        is_pay_behalf: '',
        is_collection_behalf: '',
      }
      this.page = {
        page_size: 10,
        total: 0,
        page: 1,
        currentPage: 1
      }
      this.created_at= [initDate.from,initDate.to]
      this.getData()
    },
    handleChangeDate(val) {
      if (val[0] != '') {
        this.query.created_at = [val[0] + ' 00:00:00', val[1] + ' 23:59:59']
      }

    },
  }
}
</script>
  
<style></style>