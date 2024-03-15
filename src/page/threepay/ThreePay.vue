<template>
    <div>
        <date-more :dates.sync="created_at" :title="i18n_lang.threePay47"></date-more>
        <Card dis-hover class="query_box">
            <div class="query_con">
                <div class="item">
                    <span>{{i18n_lang.threePay27}}</span>
                    <Input v-model="query.name" placeholder clearable style="width: 140px" />
                </div>
                <!--商户-->
                <div class="item">
                    <span>{{i18n_lang.threePay37}}</span>
                    <Select v-model="query.merchant_account" style="width:100px" :disabled="userInfo.merchant_account?true:false">
                        <Option value>{{i18n_lang.threePay6}}</Option>
                        <Option :value="item.account" v-for="(item,i) in merchantList" :key="i">{{item.name}}</Option>
                    </Select>
                    <!--
                    <Input v-model="query.merchant_account" placeholder clearable style="width: 140px" />
                    -->
                </div>
                <div class="item">
                    <span>{{i18n_lang.threePay24}}</span>
                    <Select v-model="query.status" style="width:100px">
                        <Option value>{{i18n_lang.threePay6}}</Option>
                        <Option :value="item.id" v-for="(item,i) in statusList" :key="i">{{item.name}}</Option>
                    </Select>
                </div>
                <div class="query_btns">
                    <Button type="primary" v-auth="53" @click="getData()">{{i18n_lang.threePay7}}</Button>
                    <Button type="primary" v-auth="50" @click="threepayEdit('add')">{{i18n_lang.threePay33}}</Button>
                    <Button type="primary" v-auth="53" @click="reset()">{{i18n_lang.threePay8}}</Button>
                </div>
            </div>
        </Card>
        <div style="marginTop:30px">
            <Table ref="table" :columns="columns" :data="dataSource" border></Table>
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
       <Modal v-model="paymentFailedModel.visible" :title="paymentFailedModel.type=='add'?i18n_lang.threePay34:i18n_lang.threePay35" :width="500">
          <Form
          v-if="paymentFailedModel.visible"
            ref="paymentInfo"
            :model="threepayData"
            :label-width="100"
            :rules="addpayValidate"
          >
            <FormItem :label="i18n_lang.threePay36" prop="partner_id">
                <Input  v-model="threepayData.partner_id" />
            </FormItem>
            <FormItem :label="i18n_lang.threePay37" prop="merchant_account"  >
                <!--<Input v-model="threepayData.merchant_account" />-->
                <Select v-model="threepayData.merchant_account" style="width:100px" :disabled="paymentFailedModel.type=='edit'?true:false">
                   
                    <Option :value="item.account" v-for="(item,i) in merchantList" :key="i">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="i18n_lang.threePay27" prop="name">
                <Input  v-model="threepayData.name" />
            </FormItem>
            <FormItem :label="i18n_lang.threePay24">
                <Select v-model="threepayData.status" style="width:100px">  
                    <Option :value="item.id" v-for="(item,i) in statusList" :key="i">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="i18n_lang.threePay38" prop="payurl">
                <Input  v-model="threepayData.payurl" />
            </FormItem>
             <FormItem :label="i18n_lang.threePay39" prop="type">
                <Input  v-model="threepayData.type" />
            </FormItem>
            <FormItem :label="i18n_lang.threePay40"  prop="key">
                <Input  v-model="threepayData.key" />
            </FormItem>
            <FormItem :label="i18n_lang.threePay41" prop="pub_key">
                <Input  v-model="threepayData.pub_key" />
            </FormItem>
             <FormItem :label="i18n_lang.threePay42">
                <Input  v-model="threepayData.ip" />
            </FormItem>
             <FormItem :label="i18n_lang.threePay43">
                <Input  v-model="threepayData.pay_callback_domain" />
            </FormItem>
             <FormItem v-if="paymentFailedModel.type=='edit'" :label="i18n_lang.threePay29">
                <Input  v-model="threepayData.sort" />
            </FormItem>
             <FormItem :label="i18n_lang.threePay48">
                <Input  v-model="threepayData.params" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" :loading="loading.threepay" @click="handleEdit">{{i18n_lang.threePay11}}</Button>
        </div>
        </Modal>
    </div>
</template>
<script>
import columns from './threePayColumns.js'
import {formatDateToString} from '@/libs/date'
const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}

const initData= {
    partner_id:'',
    merchant_account:'',
    name:'',
    payurl:'',
    status:'enabled',
    key:'',
    pub_key:'',
    type:'',
    pay_callback_domain:'',
    ip:'',
}
export default{
    name:"",
    data(){
        const i18n_lang = this.$t('threePay');
        return{
            query:{
                name:'',
                status:'',
                merchant_account:'',
                
            },
            i18n_lang:i18n_lang,
            columns:columns(this),
            page: {
                page_size: 10,
                total: 0,
                currentPage: 1
            },
            merchantList:[],//商户列表
            addpayValidate: {
                partner_id: [{ required: true, message: i18n_lang.threePay44 }],
                merchant_account:[{ required: true, message: i18n_lang.threePay44 }],
                name:[{ required: true, message: i18n_lang.threePay44 }],
                payurl:[{ required: true, message: i18n_lang.threePay44 }],
                type:[{ required: true, message: i18n_lang.threePay44 }],
                key:[{ required: true, message: i18n_lang.threePay44 }],
                pub_key:[{ required: true, message: i18n_lang.threePay44 }]
            },
            paymentFailedModel:{
                type:'add',
                visible:false 
            },
            created_at: [initDate.from,initDate.to],//日期
            //新增编辑第三方的对象
            threepayData:{...initData},
            statusList:[
                {id:"enabled",name:i18n_lang.threePay30},
                {id:"disabled",name:i18n_lang.threePay31}
            ],
            loading:{
                page:false,
                threepay:false
            },
            dataSource:[]
        }
    },
    created(){
        if(this.userInfo.merchant_account){
            this.query.merchant_account=this.userInfo.merchant_account
        }
        this.getMerchantList();
        this.getData()
    },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo
      },
    },
    methods:{
        changepage_size(page_size){
            this.page.page_size = page_size
            this.getData()
        },
        async getData(i=1) {

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
                url: '/thirdPayment',
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
            this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
            this.dataSource = res.data
            this.loading.page--
        },
        threepayEdit(type,row){
            if(type === "add"){
                this.threepayData={...initData}
            }else if(type === "edit" ){
                this.threepayData= row
            }
            this.paymentFailedModel.type=type;
            this.paymentFailedModel.visible=true;
        },
        async handleEdit(){
            this.$refs['paymentInfo'].validate(async valid => {
         
            if (valid) {
                this.loading.threepay=true;
                if(this.paymentFailedModel.type==="add"){
                    const res = await this.$axios.request({
                        url: '/thirdPayment',
                        method: 'POST',
                        data: this.threepayData
                    })
                    this.loading.threepay=false;
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
                        
                }else{
                    const res = await this.$axios.request({
                        url:`/thirdPayment/${this.threepayData.id}`,
                        method: 'PUT',
                        data: this.threepayData
                    })
                    this.loading.threepay=false;
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
                }
                
                this.paymentFailedModel.visible=false;
                this.getData();
            }
            })
        },
        //删除
        async handleDetele(row){
            const res = await this.$axios.request({
                url:`/thirdPayment/${row.id}`,
                method: 'DELETE',
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
             this.getData();
        },
        reset(){
            this.query={
                name:'',
                status:'',
                merchant_account:''
            }
            if(this.userInfo.merchant_account){
                this.query.merchant_account=this.userInfo.merchant_account
            }
            this.created_at = [initDate.from,initDate.to]
            this.getData();
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
           

            this.merchantList=res.data;
            
        },
        exportText(){
            
        }
    }
}
</script>
