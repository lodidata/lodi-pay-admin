<template>
    <div id="Account">
        <div v-if="showtype=='main'">
            <Spin v-if="loading.page" size="large" fix></Spin>
            <!--返回-->
            <Button @click="$router.push('/financialStatements')" style="margin-bottom: 20px;">{{i18n_lang.financialStatementsDetail27}}</Button>
             <!--日期-->
            <date-more :dates.sync="created_at" :title="i18n_lang.financialStatementsDetail29" ></date-more>
            <Card dis-hover class="query_box">
                <div class="query_con mb30">
                   
                  
                    <!--商户-->
                    <div class="item">
                        <span>{{i18n_lang.financialStatementsDetail28}}</span>
                        <Select v-model="query.merchant_id" style="width:100px" >
                            <Option :value="item.id" v-for="(item,i) in merchantList" :key="i">{{item.name}}</Option>
                        </Select>
                    </div>
                   
                    <div class="query_btns">
                        <Button type="primary" @click="getData()">{{i18n_lang.financialStatementsDetail30}}</Button>
                        <Button type="primary" @click="reset">{{i18n_lang.financialStatementsDetail31}}</Button>
                    </div>
                </div>
            </Card>
            <div >
                <Card :bordered="false">
                    <!--充值订单-->
                    <template #title>{{i18n_lang.financialStatementsDetail32}}</template>
                    <Table :columns="columns" :data="CollectionList" border></Table>
                </Card>
                <Card :bordered="false" style="margin-top: 20px;">
                    <!--提款订单-->
                    <template #title>{{i18n_lang.financialStatementsDetail33}}</template>
                    <Table :columns="columns" :data="PayList" border></Table>
                </Card>
            </div>
        </div>
        <div  v-if="showtype=='match'">
            <Card style="display:flex;    justify-content: flex-start;">
                <Button @click="returnMain()" >{{i18n_lang.financialStatementsDetail27}}</Button> 
                <span>
                 {{this.orderInfo.merchant_name}} {{"-"}} {{this.orderInfo.type}}
                </span>
            </Card>
            <!--
            <Card dis-hover class="query_box">
                <div class="query_con mb30">
                    <div class="item">
                        <date-more :dates.sync="created_at" :title="i18n_lang.financialStatementsDetail29"></date-more>
                    </div>
                    <div class="query_btns">
                        <Button type="primary" @click="getMatchData()">{{i18n_lang.financialStatementsDetail30}}</Button>
                    </div>
                </div>
            </Card>
            -->
            <div >
                <Card :bordered="false">
                    <Table :columns="columnsOrder" :data="mateShowList" border></Table>
                    <Page
                        class="page_box"
                        :current="page.currentPage"
                        :page-size="page.page_size"
                        :total="page.total"
                        show-sizer
                        @on-change="getMatchData"
                        @on-page-size-change="changepage_size"
                        placement="top"
                        ></Page>
                </Card>
            </div>
        </div>
         <div  v-if="showtype=='other'">
            <Card style="display:flex;    justify-content: flex-start;">
                <Button @click="returnMain()">{{i18n_lang.financialStatementsDetail27}}</Button>
                <span>
                    {{this.orderInfo.merchant_name}} {{"-"}} {{this.orderInfo.type}}
                </span>
            </Card>
            <div >
                <Card :bordered="false">
                    <Table :columns="otherColumns" :data="otherShowList" border></Table>
                    <Page
                        class="page_box"
                        :current="otherPage.currentPage"
                        :page-size="otherPage.page_size"
                        :total="otherPage.total"
                        show-sizer
                        @on-change="getThirdPayment"
                        @on-page-size-change="other_changepage_size"
                        placement="top"
                        ></Page>
                </Card>
            </div>
        </div>
         <!-- 查看图片 -->
        <image-preview ref="imgPreviewRef"></image-preview>
    </div>
  </template>
<script>
const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }
import { formatDateToString } from '@/libs/date'

import imagePreview from "./image-preview/imagePreview.vue"
import columns from './columns.js'
import orderColumns from './orderColumns.js'
import otherColumns from './otherColumns.js'
    export default {
        name:"",
        data(){
            const i18n_lang = this.$t('financialStatementsDetail');
            return{
                i18n_lang,
                columns:columns(this),
                columnsOrder:orderColumns(this),
                otherColumns:otherColumns(this),
                showtype:'main', //main 主页面   match匹配   other其他
                loading:{
                    page:false,
                },
                query:{
                    merchant_id:''
                },
                page: {
                    page_size: 10,
                    total: 0,
                    currentPage: 1
                },
                otherPage:{
                    page_size: 10,
                    total: 0,
                    currentPage: 1
                },
                merchant_account:'',

                orderInfo:{
                    type:'',
                    merchant_name:''
                },
                dateOpt: {
                    disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 4320000000
                    }
                },
                created_at:[initDate.from,initDate.to],
                data_main:[],
                data_other:[],
                merchantList:[],//商户列表
                CollectionList:[], //充值订单信息
                mateShowList:[], //匹配列表
                otherShowList:[],  //其他列表
                PayList:[], //提款订单信息
                matchType:'',
                ThirdPaymentObj:''
            }
        },
        components:{
            imagePreview
        },
        created(){
            this.merchant_account=this.$route.query.merchant_account
            this.getMerchantList();
        },
        methods:{
              // 设置每页条数
            changepage_size (page_size) {
                this.page.page_size = page_size
                this.getMatchData()
            },
            other_changepage_size(page_size) {
                this.otherPage.page_size = page_size;
                this.getThirdPayment()
            },
            returnMain(){
                this.showtype='main';
                this.getData();
            },
            handleView(row){
                console.log(row)
                let uploadImagesUrlArr = row
                this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
            },
            async getData(){
               
                this.loading.page=true
                let arr = []
                    let m, y;
                    
                    if (this.created_at[0] != '') {

                        m = formatDateToString(new Date(this.created_at[0])) + ' 00:00:00'
                        y = formatDateToString(new Date(this.created_at[1])) + ' 23:59:59'
                        arr = [m, y]
                    } else {
                        arr = []
                    }
                const res = await this.$axios.request({
                    url: `/financialStatements/show/${this.query.merchant_id}`,
                    method: 'GET',
                    params:{
                        created_at:arr
                    }
                    })
                    if (res.status !== 200 || res.state !== 0) {
                    this.$msg({
                        type: 'error',
                        message: res.message
                    })
                    return
                }
           
                this.loading.page=false;
                this.CollectionList=[{
                    total_amount:res.data.collection_list.total_amount,
                    total_num:res.data.collection_list.total_num,
                    config_name:this.i18n_lang.financialStatementsDetail34,
                    type:0
                }]
                this.PayList=[];
                
                this.PayList.push({
                    total_amount:res.data.pay_list.total_amount,
                    total_num:res.data.pay_list.total_num,
                    config_name:this.i18n_lang.financialStatementsDetail34,
                    type:1
                })
                 this.PayList.push(...res.data.third_pay_list);
                
            },
            handleDetail(row){
                this.merchantList.forEach(item=>{
                    if(this.query.merchant_id==item.id){
                        this.orderInfo.merchant_name=item.name
                    }
                })
                  this.orderInfo.type=row.config_name;
                if(row.type==null){
                    this.ThirdPaymentObj=row
                    this.getThirdPayment();
                }else{
                    this.matchType=row.type;
                    //匹配订单状态
                    this.getMatchData()
                }
                
            },
            //财务报表支付匹配详情
            async getThirdPayment(i=1){
                
                if(i) this.otherPage.currentPage = i;
                let arr = []
                let m, y;
                
                if (this.created_at[0] != '') {

                    m = formatDateToString(new Date(this.created_at[0])) + ' 00:00:00'
                    y = formatDateToString(new Date(this.created_at[1])) + ' 23:59:59'
                    arr = [m, y]
                } else {
                    arr = []
                }
                
                const res = await this.$axios.request({
                    url: `/financialStatements/thirdPayment/show/${this.ThirdPaymentObj.merchant_id}`,
                    method: 'GET',
                    params:{
                        page: this.otherPage.currentPage,
                        page_size: this.otherPage.page_size,
                        config_id:this.ThirdPaymentObj.pay_config_id,
                        created_at:arr
                    }
                })
                if (res.status !== 200 || res.state !== 0) {
                    this.$msg({
                        type: 'error',
                        message: res.message
                    })
                    return
                }
                 this.otherPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
                this.showtype="other";
                this.otherShowList=res.data;
            },
            //查询匹配信息列表
            async getMatchData(i=1){
                if (i) this.page.currentPage = i;
                 let arr = []
                let m, y;
                
                if (this.created_at[0] != '') {

                    m = formatDateToString(new Date(this.created_at[0])) + ' 00:00:00'
                    y = formatDateToString(new Date(this.created_at[1])) + ' 23:59:59'
                    arr = [m, y]
                } else {
                    arr = []
                }
                const res = await this.$axios.request({
                    url: `/financialStatements/mateShow/${this.query.merchant_id}`,
                    method: 'GET',
                    params:{
                        page: this.page.currentPage,
                        page_size: this.page.page_size,
                        type:this.matchType,
                        created_at:arr
                    }
                })
                if (res.status !== 200 || res.state !== 0) {
                    this.$msg({
                        type: 'error',
                        message: res.message
                    })
                    return
                }
           
                this.mateShowList=res.data;
                this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
                     this.showtype="match";
            },

            reset(){
                this.merchant_account=this.$route.query.merchant_account;

                this.merchantList.forEach(item=>{
                    if(item.account==this.merchant_account){
                        this.query.merchant_id=item.id
                    }
                })
                this.created_at = [initDate.from,initDate.to]
                 this.getData()
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
                res.data.forEach(item=>{
                    if(item.account==this.merchant_account){
                        this.query.merchant_id=item.id
                    }
                })
                this.merchantList=res.data;
                  this.getData();
            },
        }
    }
  </script>