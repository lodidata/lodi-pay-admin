<template>
  <div id="Account">
    <Spin fix v-if="loading.page"></Spin>
    <date-more :dates.sync="created_at" :title="i18n_lang.match20"></date-more>

    <Card dis-hover class="query_box">
      <div class="query_con mb30">
        <!--提款订单号-->
        <div class="item">
          <span>{{ i18n_lang.match18 }}</span>
          <Input v-model="query.pay_inner_order_sn" clearable style="width:120px;" />
        </div>
        <!--商户订单号-->
        <div class="item">
          <span>{{ i18n_lang.match19 }}</span>
          <Input v-model="query.pay_order_sn" clearable style="width:120px;" />
        </div>
        <!--商户号-->
        <div class="item">
          <span>{{ i18n_lang.match39 }}</span>
          <Input v-model="query.merchant_account" clearable style="width:120px;" />
        </div>
        <!--提款账户-->
        <div class="item">
          <span>{{ i18n_lang.match44 }}</span>
          <Input v-model="query.pay_user_account" clearable style="width:120px;" />
        </div>
         <!--匹配金额-->
        <div class="item">
          <span>{{ i18n_lang.match42 }}</span>
          <Input v-model="query.amount" style="width:120px;" clearable :placeholder="i18n_lang.match45" />
        </div>
        <!--充值账号-->
        <div class="item">
          <span>{{ i18n_lang.match43 }}</span>
          <Input v-model="query.user_account" clearable style="width:120px;" />
        </div>
        <!--状态-->
        <div class="item">
          <span>{{ i18n_lang.match23 }}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{ i18n_lang.match41 }}</Option>
            <Option :value="item.id" v-for="(item, i) in stateList" :key="i">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="query_btns">
          <Button type="primary" v-auth="36" @click="getData()">{{ i18n_lang.match21 }}</Button>
          <Button type="primary" v-auth="36" @click="reset">{{ i18n_lang.match22 }}</Button>
        </div>
      </div>
      <!-- <Button type="primary" @click="addAccount('add')">新增</Button> -->
    </Card>
    <div style="marginTop:30px">
      <Table :columns="columns" :data="dataSource" border></Table>
      <Page class="page_box" :current="page.currentPage" :page-size="page.page_size" :total="page.total" show-sizer
        @on-change="getData" @on-page-size-change="changepage_size" placement="top"></Page>
    </div>
    <!--详情-->
    <Modal v-model="detailVisible.handle" :title="'详情'" :width="1000">
      <Detail :id="detailVisible.id" v-if="detailVisible.handle"></Detail>
    </Modal>
    <!-- 查看图片 -->
    <image-preview ref="imgPreviewRef"></image-preview>
  </div>
</template>
  
<script>
import columns from './columns.js'
import MoreOptionCheck from '../../../components/MoreOptionCheck'
import imagePreview from "./image-preview/imagePreview.vue"
import Detail from './detail/index.vue'
import { formatDateToString } from '@/libs/date'

let initDate = {
  from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}
export default {
   name:'match',
  components: {
    MoreOptionCheck,
    imagePreview,
    Detail
  },
  data() {
    const i18n_lang = this.$t('match');
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
      detailVisible: {
        handle: false,
        id: ''
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
        user_account: '', //充值账号
        pay_user_account: '', //提款账号
        amount: '', //匹配大于金额
        pay_inner_order_sn: '',//提款订单号
        pay_order_sn: '',    //商户订单号
        merchant_account: '', //商户号
        status: '', // 状态 1=待匹配 2=待上传凭证 3=上传凭证超时 4=待确认 5=确认超时 6=订单完成 7=订单异常
      },
      stateList: [
        // { id: 1, name: i18n_lang.match24 },
        { id: 2, name: i18n_lang.match25 },
        { id: 3, name: i18n_lang.match26 },
        { id: 4, name: i18n_lang.match27 },
        { id: 5, name: i18n_lang.match28 },
        { id: 6, name: i18n_lang.match29 },
        // { id: 7, name: i18n_lang.match30  },
        // { id: 8, name: i18n_lang.match37 },
        { id: 9, name: i18n_lang.match38 },
        { id: 10, name: i18n_lang.match40 },

      ], // 状态数据

      created_at: [initDate.from, initDate.to], // 默认日期
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
        let parameter = sessionStorage.getItem('parameter') || '{}';
        this.query.pay_inner_order_sn = this.$route.query.pay_inner_order_sn;
        this.query.merchant_account = this.$route.query.merchant_account;
        if(this.$route.query.pay_inner_order_sn || this.$route.query.merchant_account){
          this.created_at=['','']
          this.getData()
        }else if(JSON.parse(parameter).match){
            let matchQuery=JSON.parse(parameter).match
             if(matchQuery.created_at){
              this.created_at=matchQuery.created_at
            }
            this.query.user_account=matchQuery.user_account;
            this.query.pay_user_account=matchQuery.pay_user_account;
            this.query.amount=matchQuery.amount;
            this.query.pay_inner_order_sn=matchQuery.pay_inner_order_sn;
            this.query.pay_order_sn=matchQuery.pay_order_sn;
            this.query.merchant_account=matchQuery.merchant_account;
            this.query.status=matchQuery.status;
            this.page.currentPage=matchQuery.currentPage,
            this.page.page_size=matchQuery.page_size;

            this.getData(this.page.currentPage);
        }else{
          this.getData()
        }
    },
    async getData(i = 1) {
      if(this.query.amount<0) {
        this.$msg({
          type: 'error',
          message: this.i18n_lang.match46
        })
        return 
      }
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
        url: '/orders/matched',
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

        parameter.match = {
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
    reset() {
      this.query = {
        user_account: '',
        pay_user_account: '',
        amount: '',
        pay_inner_order_sn: '',
        inner_order_sn: '',
        merchant_account: '',
        status: '', // 状态 1=待匹配 2=待上传凭证 3=上传凭证超时 4=待确认 5=确认超时 6=订单完成 7=订单异常
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
    handleEdit(row, type) {
      if (type === "detail") {
        this.detailVisible.id = row.id;
        this.detailVisible.handle = true;
        /*
        this.$router.push({
            path: `match/detail`,
            query: {
              id: row.id
            }
        })*/
      }
    },
    // 查看图片
    handleView(row) {
      console.log(row)
      let uploadImagesUrlArr = row.url
      this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
    },
  }
}
</script>
  
<style></style>