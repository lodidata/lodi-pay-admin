<template>
    <div id="Account">
      <Spin fix v-if="loading.page"></Spin>

      <date-more :dates.sync="created_at" :title="i18n_lang.withdraw17"></date-more>
    
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>{{i18n_lang.withdraw13}}</span>
            <Input v-model="query.inner_order_sn" clearable style="width:120px;"/>
          </div>
          <div class="item">
            <span>{{i18n_lang.withdraw14}}</span>
            <Input v-model="query.order_sn" clearable style="width:120px;"/>
          </div>
          <div class="item">
            <span>{{i18n_lang.withdraw30}}</span>
            <Input v-model="query.merchant_account" clearable  style="width:120px;" :disabled="userInfo.merchant_account?true:false" />
          </div>
          <div class="item">
            <span>{{i18n_lang.withdraw31}}</span>
            <Input v-model="query.user_account" clearable style="width:120px;"/>
          </div>
          <div class="item">
            <span>{{i18n_lang.withdraw15}}</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>{{i18n_lang.withdraw16}}</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div>
          <!-- <div class="item">
            <span>{{i18n_lang.withdraw17}}</span>
            <DatePicker type="daterange" placement="bottom-end" style="width: 200px" :options="options"
            @on-change="handleChangeDate"
            v-model="created_at" />
          </div> -->
          <div class="query_btns">
            <Button type="primary" v-auth="40" @click="getData()">{{i18n_lang.withdraw18}}</Button>
            <Button type="primary" v-auth="40" @click="reset">{{i18n_lang.withdraw19}}</Button>
          </div>
        </div>

        <!-- <Button type="primary" @click="addAccount('add')">{{i18n_lang.withdraw20}}</Button> -->

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
      <!--详情-->
      <Modal v-model="detailVisible.handle" :title="i18n_lang.withdraw33" :width="1000">
          <Detail :id="detailVisible.id" v-if="detailVisible.handle"></Detail>
      </Modal>
       <!--第三方代付-->
    <Modal v-model="visible.threepay" :title="i18n_lang.withdraw34" :width="500">
        <Form
            ref="threePayInfo"
            :model="threePayInfo"
            :label-width="100"
            :rules="threePayInfoValidate"
          >
            <!--状态-->
            <FormItem :label="i18n_lang.withdraw15" v-if="threePayInfo.type=='showPay'" >
                <Input  :value="threePayInfo.pay_status" disabled  />
            </FormItem>
            <!--主提款订单号-->
            <FormItem :label="i18n_lang.withdraw1"  >
                <Input v-model="threePayInfo.order_pay_inner_order_sn" disabled  />
            </FormItem>
            <!--商户订单号-->
            <FormItem :label="i18n_lang.withdraw2"  >
                <Input v-model="threePayInfo.inner_order_sn" disabled  />
            </FormItem>
            <!--所属商户-->
            <FormItem :label="i18n_lang.withdraw4"  >
                <Input  v-model="threePayInfo.merchant_name" disabled  />
            </FormItem>
            <!--用户账号-->
            <FormItem :label="i18n_lang.withdraw35"  >
                <Input v-model="threePayInfo.user_account" disabled  />
            </FormItem>
            <!--匹配订单金额-->
            <FormItem :label="i18n_lang.withdraw36"  >
                <Input v-model="threePayInfo.amount" disabled  />
            </FormItem>
            <!--
            <FormItem :label="'收款人'" >
              <Input v-model="threePayInfo.bank_card_name" disabled  />
            </FormItem>
            <FormItem :label="'银行卡账号'" >
              <Input v-model="threePayInfo.bank_card_account" disabled  />
            </FormItem>
            -->
            <!--'支付类型'-->
             <FormItem :label="i18n_lang.withdraw37" prop="pay_type"  >
                <!---
                <Input v-model="threePayInfo.pay_type	"   />
                -->
                <Select v-model="threePayInfo.pay_type" style="width:100px" :disabled="threePayInfo.type=='showPay'?true:false">
                    <Option :value="item.type" v-for="(item,i) in ThirdPayment" :key="i">{{item.name}}</Option>
                </Select>
            </FormItem>
            <!--备注-->
            <FormItem :label="i18n_lang.withdraw38" prop="bank_card_remark" >
                <Input v-model="threePayInfo.bank_card_remark"  type="textarea" :rows="4" :disabled="threePayInfo.type=='showPay'?true:false" />
            </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :loading="loading.uploadedInfo" @click="onThreePay">{{i18n_lang.withdraw39}}</Button>
        </div>
    </Modal>
    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import MoreOptionCheck from '../../../components/MoreOptionCheck'
  // import { computeDay } from '@/helper/tool/handleDate'
  import Detail from './detail/index.vue'
  import {formatDateToString} from '@/libs/date'

  
  const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }
  export default {
    name:'withdraw',
    components: {
      MoreOptionCheck,
      Detail
    },
    data () {
      const i18n_lang = this.$t('withdraw');
      return {
        loading: {
          page: 0,
          addBtn: false,
          ipBtn: false,
          password: false
        },
        visible: {
          addModel: false,
          password: false,
          threepay: false,
        },
        detailVisible:{
          handle:false,
          id:''
        },
        i18n_lang,
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          currentPage: 1
        },
        query: {
          inner_order_sn: '',
          order_sn: '',
          merchant_account:'',
          user_account:'',
          status: '', //1待匹配 2待上传凭证 3上传凭证超时 4待确认 5待确认超时 6订单成功 7订单失败 8进行中
        },
        threePayInfo:{

        },
        ThirdPayment:[],
        threePayInfoValidate:{
          bank_card_remark:[{ required: true, message: i18n_lang.withdraw40 }],
          pay_type:[{ required: true, message: i18n_lang.withdraw41 }],
        },
        created_at: [initDate.from,initDate.to],//日期
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        roleList: [],
        stateList: [
          { id: 1, name: i18n_lang.withdraw21 },
          // { id: 2, name: i18n_lang.withdraw22 },
         /* { id: 3, name: i18n_lang.withdraw23 },*/
          // { id: 4, name: i18n_lang.withdraw24 },
         /* { id: 5, name: i18n_lang.withdraw25 },*/
         // { id: 7, name: i18n_lang.withdraw27 },
          { id: 8, name: i18n_lang.withdraw28 },
          { id: 6, name: i18n_lang.withdraw26 },
          { id: 9, name: i18n_lang.withdraw29 },
          { id: 11, name: i18n_lang.withdraw43 },
        ], // 状态数据
      }
    },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo
      },
    },
    created () {
      this.init();
    },
    methods: {
      init(){
          let parameter = sessionStorage.getItem('parameter') || '{}';
          this.query.inner_order_sn = this.$route.query.inner_order_sn;
          this.query.merchant_account = this.$route.query.merchant_account;
          this.query.user_account = this.$route.query.user_account;

          if(this.userInfo.merchant_account){ //判断是否是商户
            this.query.merchant_account=this.userInfo.merchant_account;
          }
          
          //带参数过来查询时取消当日期
          if(this.$route.query.inner_order_sn || this.$route.query.merchant_account ||this.$route.query.user_account){
            this.created_at=['',''];
            this.getData()
          }else if(JSON.parse(parameter).withdraw){
              let withdrawQuery= JSON.parse(parameter).withdraw;

              if(withdrawQuery.created_at){
                this.created_at=withdrawQuery.created_at
              }
              this.query.inner_order_sn=withdrawQuery.inner_order_sn||'';
              this.query.order_sn=withdrawQuery.order_sn||'';
              this.query.merchant_account=withdrawQuery.merchant_account||'';
              this.query.user_account=withdrawQuery.user_account||''
              this.query.status=withdrawQuery.status||''

              this.page.currentPage=withdrawQuery.currentPage,
              this.page.page_size=withdrawQuery.page_size;
              this.getData(this.page.currentPage);
          }else{
            this.created_at=[initDate.from,initDate.to]
            this.getData();
          }
      },
      async getData (i=1) {
        if (i) this.page.currentPage = i;
        this.loading.page++
        let m, y;
        let arr = []
        
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
          ...this.query,
          created_at: arr
        }
       

        const res = await this.$axios.request({
          url: '/orders/pay',
          method: 'get',
          params: query
        })
        if (res.status !== 200 || res.state !== 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }

        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)

        parameter.withdraw = {
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
      // 查看详情
      handleView(row) {
        this.detailVisible.id=row.id;
        this.detailVisible.handle=true;
        /*
        this.$router.push({
            path: `withdraw/detail`,
            query: {
              id: row.id
            }
        })*/
      },

       //获取第三方支付列表
      async getThirdPayment(merchant_account){
          this.ThirdPayment=[];
          const res = await this.$axios.request({
              url: '/thirdPayment/tree',
              method: 'get',
              params:{
                merchant_account:merchant_account
              }
              })
              if (res.status !== 200 || res.state !== 0) {
              this.$msg({
                  type: 'error',
                  message: res.message
              })
              return
          }
          this.ThirdPayment=res.data
        },
      async handleEdit(row,type){
        if(type === "pay" || type === "showPay"){
          this.threePayInfo.bank_card_remark='';
         
          
          await this.getThirdPayment(row.merchant.account);

          this.threePayInfo.order_pay_inner_order_sn=row.inner_order_sn; //主提款订单号
          this.threePayInfo.inner_order_sn=row.order_sn; //商户订单号
          this.threePayInfo.user_account=row.user?row.user.user_account : '', //用户账号
          this.threePayInfo.amount=row.fail_amount, //匹配订单金额
          this.threePayInfo.merchant_name=row.merchant?row.merchant.name:'' //所属厂商
          this.threePayInfo.pay_status=row.status_label;

      

          this.threePayInfo.type=type;
          this.threePayInfo.id=row.id;
          this.visible.threepay=true;
        }
        else if(type=="turndown"){
          
            const res = await this.$axios.request({
              url: `/orders/pay/reject/${row.id}`,
              method: 'POST',
              data: {}
            })

            if (res.status !== 200 || res.state !== 0) {
              this.$msg({
                type: 'error',
                message: res.message
              })
              return
            }
            this.$msg({
                type: 'success',
                message: res.message
            })
            this.getData(this.page.currentPage);
        }
      },
      async onThreePay(){
          this.$refs['threePayInfo'].validate(async valid => {
              if (!valid) return;
              let query={
                remark:this.threePayInfo.bank_card_remark,
                pay_type:this.threePayInfo.pay_type,
                amount:this.threePayInfo.amount
              }
              const res = await this.$axios.request({
                url: `/orders/pay/pay/${this.threePayInfo.id}`,
                method: 'POST',
                data: query
              })

              if (res.status !== 200 || res.state !== 0) {
                this.$msg({
                  type: 'error',
                  message: res.message
                })
                return
              }
              this.$msg({
                  type: 'success',
                  message: res.message
              })
               this.threePayInfo.pay_type=' ' ;
              this.visible.threepay=false;
              this.getData(this.page.currentPage);
          })
      },
      reset () {
        this.query = {
          inner_order_sn: '',
          order_sn: '',
          merchant_account:'',
          user_account:'',
          status: '',
        }
        if(this.userInfo.merchant_account){ //判断是否是商户
          this.query.merchant_account=this.userInfo.merchant_account;
        }
        this.created_at = [initDate.from,initDate.to]
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
      handleChangeDate (val) {
        // [this.query.start_date, this.query.end_date] = val
        this.created_at = val
      },
      chnageLimitRecharge(val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>
  </style>