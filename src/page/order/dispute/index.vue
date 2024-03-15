<template>
    <div id="dispute">
      <Spin fix v-if="loading.page"></Spin>
      <date-more :dates.sync="created_at" :title="i18n_lang.dispute37"></date-more>

      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <!--主提款订单号-->
          <div class="item">
            <span>{{ i18n_lang.dispute34 }}</span>
            <Input v-model="query.pay_inner_order_sn" clearable style="width:120px;"/>
          </div>
          <!--商户订单号-->
           <div class="item">
            <span>{{ i18n_lang.dispute2 }}</span>
            <Input v-model="query.pay_order_sn" clearable style="width:120px;"/>
          </div>
          <!--提款账户-->
          <div class="item">
            <span>{{ i18n_lang.dispute81 }}</span>
            <Input v-model="query.pay_user_account" clearable style="width:120px;"/>
          </div>
          <!--匹配金额-->
          <div class="item">
            <span>{{ i18n_lang.dispute82 }}</span>
            <Input v-model="query.amount" clearable style="width:120px;"/>
          </div>
          <!--充值订单号-->
          <div class="item">
            <span>{{ i18n_lang.dispute35 }}</span>
            <Input v-model="query.inner_order_sn" clearable style="width:120px;"/>
          </div>
          <!--充值商户订单号-->
          <div class="item">
            <span>{{ i18n_lang.dispute36 }}</span>
            <Input v-model="query.order_sn" clearable style="width:120px;"/>
          </div>
          <!--充值账户-->
          <div class="item">
            <span>{{ i18n_lang.dispute83 }}</span>
            <Input v-model="query.user_account" clearable style="width:120px;"/>
          </div>
          <!--匹配订单状态-->
          <div class="item">
            <span>{{i18n_lang.dispute84}}</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>{{i18n_lang.dispute48}}</Option>
              <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
            </Select>
          </div>
          
          <div class="query_btns">
            <Button type="primary" @click="getData()">{{ i18n_lang.dispute38 }}</Button>
            <Button type="primary" @click="reset">{{ i18n_lang.dispute39 }}</Button>
          </div>
        </div>
        <!-- <Button type="primary" @click="addAccount('add')">新增</Button> -->
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
      <!-- 查看图片 -->
      <image-preview ref="imgPreviewRef"></image-preview>

      <!-- 处理 -->
      <Modal v-model="visible.handle" :title="i18n_lang.dispute60" :width="500">
        <Form
          ref="handleInfo"
          :model="handleInfo"
          :label-width="100"
          >
          <FormItem :label="i18n_lang.dispute61">
              <Select
                v-model="handleInfo.action_type"
                :placeholder="''"
              >
              <Option v-for="(it, i) in solutionList" :key="i" :value="it.id">{{ it.name }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="i18n_lang.dispute62">
              <Select
                v-model="handleInfo.problem_source"
                :placeholder="''"
              >
              <Option v-for="(it, i) in imputationList" :key="i" :value="it.id">{{ it.name }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="i18n_lang.dispute63">
            <Input v-model="handleInfo.description" type="textarea" :rows="4" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :loading="loading.handle" @click="handleOrder()">{{i18n_lang.dispute60}}</Button>
        </div>
    </Modal>
    <!--待上传 待确认-->
    <Modal v-model="visible.toBeUploaded" :title="toBeUploadedInfo.type=='upload'?i18n_lang.dispute58:i18n_lang.dispute59" :width="500">
         <Form
            ref="toBeUploadedInfo"
            :model="toBeUploadedInfo"
            :label-width="100"
          >
            <FormItem :label="i18n_lang.dispute64" >
                <Input v-model="toBeUploadedInfo.remark"  type="textarea" :rows="4" />
            </FormItem>
            <FormItem :label="i18n_lang.dispute65"  >
                  <span  v-for="(item,index) in toBeUploadedInfo.fileList" :key="index" style="position: relative;width:100px;height:100px;display: inline-block;margin-right:10px">
                    <img   :src="item.fileValue" alt  style="width:100px;height:100px;">
                    <Icon :size="18" type="ios-close-circle-outline" @click="delImg(index)" style=" position: absolute;top:-9px;right:-9px" />
                  </span>
                  <Upload 
                    :before-upload="handleUpload" 
                    action
                    multiple
                    :format="['jpg','jpeg','png']">
                    <Button icon="ios-cloud-upload-outline">{{i18n_lang.dispute65}}</Button>
                  </Upload>
            </FormItem>
             <FormItem :label="i18n_lang.dispute61" >
                 {{i18n_lang.dispute66}}
            </FormItem>
         </Form>
          <div slot="footer">
          <Button type="primary" :loading="loading.uploadedInfo" @click="orderTrial">{{i18n_lang.dispute67}}</Button>
        </div>
    </Modal>
    <!--第三方代付-->
    <Modal v-model="visible.threepay" :title="i18n_lang.dispute75" :width="500">
        <Form
            ref="threePayInfo"
            :model="threePayInfo"
            :label-width="100"
            :rules="threePayInfoValidate"
          >
            <!--状态-->
            <FormItem :label="i18n_lang.dispute47" v-if="threePayInfo.type=='showPay'" >
                <Input  :value="threePayInfo.pay_status==0?i18n_lang.dispute78:i18n_lang.dispute79" disabled  />
            </FormItem>
            <!--主提款订单号-->
            <FormItem :label="i18n_lang.dispute1"  >
                <Input v-model="threePayInfo.order_pay_inner_order_sn" disabled  />
            </FormItem>
            <!--商户订单号-->
            <FormItem :label="i18n_lang.dispute2"  >
                <Input v-model="threePayInfo.inner_order_sn" disabled  />
            </FormItem>
            <FormItem :label="i18n_lang.dispute4"  >
                <Input  v-model="threePayInfo.merchant_name" disabled  />
            </FormItem>
            <!--用户账号-->
            <FormItem :label="i18n_lang.dispute42"  >
                <Input v-model="threePayInfo.user_account" disabled  />
            </FormItem>
            <!--匹配订单金额-->
            <FormItem :label="i18n_lang.dispute43"  >
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
             <FormItem :label="i18n_lang.dispute87" prop="pay_type"  >
                <!---
                <Input v-model="threePayInfo.pay_type	"   />
                -->
                <Select v-model="threePayInfo.pay_type" style="width:100px" :disabled="threePayInfo.type=='showPay'?true:false">
                    <Option :value="item.type" v-for="(item,i) in ThirdPayment" :key="i">{{item.name}}</Option>
                </Select>
            </FormItem>
            <!--备注-->
            <FormItem :label="i18n_lang.dispute46" prop="bank_card_remark" >
                <Input v-model="threePayInfo.bank_card_remark"  type="textarea" :rows="4" :disabled="threePayInfo.type=='showPay'?true:false" />
            </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" :loading="loading.uploadedInfo" @click="onThreePay">{{i18n_lang.dispute67}}</Button>
        </div>
    </Modal>
    <!--详情-->
    <Modal v-model="detailVisible.handle" :title="i18n_lang.dispute41" :width="1000">
        <Detail :id="detailVisible.id" v-if="detailVisible.handle"></Detail>
    </Modal>
    </div>
  </template>
  
  <script>
    
  import columns from './columns.js'
  import imagePreview from "./image-preview/imagePreview.vue"
  import Detail from './detail/index.vue'
  import { formatDateToString } from '@/libs/date'

  const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }

  export default {
    name:'dispute',
    components: {
      imagePreview,
      Detail
    },
    data () {
      const i18n_lang = this.$t('dispute');
      return {
        i18n_lang:i18n_lang,
        loading: {
          page: 0,
          addBtn: false,
          ipBtn: false,
          handle: false,
          uploadedInfo:false,

        },
        visible: {
          handle:false,
          toBeUploaded: false,
          threepay:false  //三方代付
        },
        detailVisible:{
          handle:false,
          id:''
        },
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          currentPage: 1
        },
        solutionList:[
          { id:2, name: i18n_lang.dispute57},
          { id:3, name: i18n_lang.dispute69},
          
        ],//处理方案
        imputationList:[
          { id:1, name: i18n_lang.dispute70 },
          { id:2, name: i18n_lang.dispute71 },
          { id:3, name: i18n_lang.dispute72 },
          { id:4, name: i18n_lang.dispute73 },
        ],
        stateList: [
          { id: 1, name: i18n_lang.dispute49 },
          { id: 2, name: i18n_lang.dispute50 },
          { id: 3, name: i18n_lang.dispute51 },
          { id: 4, name: i18n_lang.dispute52 },
          { id: 5, name: i18n_lang.dispute53 },
          { id: 6, name: i18n_lang.dispute54 },
          //{ id: 7, name: i18n_lang.dispute55},
          { id: 8, name: i18n_lang.dispute56 },
          { id: 9, name: i18n_lang.dispute57 },
        ], // 状态数据
        handleInfo:{
          id:'',
          action_type:2,
          problem_source:4,
          description:''
        },
        threePayInfo:{
          bank_card_name:'',
          bank_card_account:'',
          bank:'',
          bank_card_remark:'',
          pay_type:''
        },
        threePayInfoValidate:{
          bank_card_remark:[{ required: true, message: i18n_lang.dispute76 }],
          pay_type:[{ required: true, message: i18n_lang.dispute85 }],
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
        ThirdPayment:[], //第三方支付数组
        query: {
          pay_inner_order_sn: '', //主要提现订单
          pay_order_sn:'',   //商户订单号
          inner_order_sn: '', //充值订单号
          pay_user_account:'', //提款账户
          user_account:'', //充值账户
          amount:'',      //匹配金额
          order_sn: '',  //充值商户订单号
         
          status: '', // 状态 1=待匹配 2=待上传凭证 3=上传凭证超时 4=待确认 5=确认超时 6=订单完成 7=订单异常  8进行中 9订单失败
        },
        created_at: [initDate.from,initDate.to],
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() 
          }
        },
      }
    },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo
      },
    },
    created () {
     
      this.init()
      //this.getRole()
    },
    methods: {
      init(){
        let parameter = sessionStorage.getItem('parameter') || '{}';
        this.query.inner_order_sn = this.$route.query.inner_order_sn;

        if(this.$route.query.inner_order_sn){
          this.created_at=['','']
          this.getData()
        }else if(JSON.parse(parameter).dispute){
            let disputeQuery=JSON.parse(parameter).dispute;

            if(disputeQuery.created_at){
              this.created_at=disputeQuery.created_at
            }
            this.query.pay_inner_order_sn=disputeQuery.pay_inner_order_sn;
            this.query.pay_order_sn=disputeQuery.pay_order_sn;
            this.query.inner_order_sn=disputeQuery.inner_order_sn;
            this.query.pay_user_account=disputeQuery.pay_user_account
            this.query.user_account=disputeQuery.user_account;
            this.query.amount=disputeQuery.amount;
            this.query.order_sn=disputeQuery.order_sn;
            this.query.status=disputeQuery.status;
            this.page.currentPage=disputeQuery.currentPage,
            this.page.page_size=disputeQuery.page_size;
            this.getData(this.page.currentPage);

        }else{

          this.getData()

        }
      },
      // 选择图片
      handleUpload(file) {
        //console.log(file)
        if(this.toBeUploadedInfo.fileList.length>=3){
          this.$Message.warning(this.i18n_lang.dispute74);
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
      async getData (i=1) {
        if (i) this.page.currentPage = i;
        this.loading.page++;
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
          created_at: arr,
          page_size: this.page.page_size,
          ...this.query
        }
        
        const res = await this.$axios.request({
          url: '/orders/trial',
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
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)

        parameter.dispute = {
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
      async onThreePay(){
          if(this.threePayInfo.type=='showPay'){ //查看代付
            this.visible.threepay=false;
            return;
          }
          this.$refs['threePayInfo'].validate(async valid => {
              if (!valid) return;
              let query={
                remark:this.threePayInfo.bank_card_remark,
                pay_type:this.threePayInfo.pay_type,
              }
              const res = await this.$axios.request({
                url: `/orders/trial/pay/${this.threePayInfo.id}`,
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
              this.visible.threepay=false;
              this.getData(this.page.currentPage);
          })
      },
      //表格行
      async handleEdit(row,type){
        //详情
        if(type==="detail"){
          this.detailVisible.id=row.id;
          this.detailVisible.handle=true;
          /*
           this.$router.push({
              path: `dispute/detail`,
              query: {
                id: row.id
              }
          })
          */
        }//处理
        else if(type === "handle"){
           this.handleInfo={
              action_type:2,
              problem_source:4,
              description:'',
              id:row.id
           }
          this.visible.handle=true;
        }//待上传
        else if(type === "toBeUploaded"){
          this.toBeUploadedInfo.id=row.id;
          this.toBeUploadedInfo.type="upload"
          this.visible.toBeUploaded=true;

        }//待确认
        else if(type === "toBeConfirmed"){
          this.toBeUploadedInfo.id=row.id;
          this.toBeUploadedInfo.type="confirm";
          this.visible.toBeUploaded=true;

        }else if(type === "pay" || type === "showPay"){
         
         await this.getThirdPayment(row.order_collection.order_pay.merchant_account);

          this.threePayInfo.order_pay_inner_order_sn=row.order_collection.order_pay.inner_order_sn; //主提款订单号
          this.threePayInfo.inner_order_sn=row.order_collection.inner_order_sn; //商户订单号
          this.threePayInfo.user_account=row.order_collection.order_pay ? row.order_collection.order_pay.user_account : '', //用户账号
          
          this.threePayInfo.amount=row.order_collection.amount, //匹配订单金额
          this.threePayInfo.merchant_name=row.order_collection.order_pay.merchant?row.order_collection.order_pay.merchant.name:'' //所属厂商
          this.threePayInfo.pay_status=row.pay_status;
          this.threePayInfo.bank_card_remark=row.remark;
          this.threePayInfo.pay_type=(row.order_collection.transfer_record&&row.order_collection.transfer_record.pay_config )? row.order_collection.transfer_record.pay_config.type:'';
          this.threePayInfo.type=type;
          this.threePayInfo.id=row.id;
          this.visible.threepay=true;
        }
      },
      //处理订单
      async handleOrder(){
        this.loading.handle=true;
        let query = {
          action_type:this.handleInfo.action_type,
          description:this.handleInfo.description,
          problem_source:this.handleInfo.problem_source
        }
        const res = await this.$axios.request({
          url: `/orders/trial/${this.handleInfo.id}`,
          method: 'PUT',
          data: query
        })
        this.loading.handle=false;
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
        this.visible.handle=false;
        this.getData(this.page.currentPage);
      },
      //删除选中的图片
      delImg(index){
          this.toBeUploadedInfo.fileList.splice(index, 1)
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
        this.orderTrial(res.data.url)
      },
      //待上传 待确认上传请求
      async orderTrial(url){
        this.loading.uploadedInfo=true;
        let urls=[]
        this.toBeUploadedInfo.fileList.forEach(item=>{
          urls.push(item.url)
        })
        let req={
          url:urls,
          remark:this.toBeUploadedInfo.remark,
          type:this.toBeUploadedInfo.type
        }
        const res = await this.$axios.request({
          url: `/orders/trial/status/${this.toBeUploadedInfo.id}`,
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
        this.getData();
      },
      reset () {
        this.query = {
          pay_inner_order_sn: '',
          pay_order_sn: '',
          inner_order_sn:'',
          pay_user_account:'',
          user_account:'',
          amount: '',
          status: '',
        }
        this.created_at=[initDate.from,initDate.to]
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
    }
  }
  </script>
  
  <style lang="less" >
  </style>