<template>
    <div>
        <date-more :dates.sync="created_at" :title="i18n_lang.threePay47"></date-more>
        <Card dis-hover class="query_box">
            <div class="query_con">
                <div class="item">
                    <span>{{i18n_lang.threePay2}}</span>
                    <Input v-model="query.bank_card_account" placeholder clearable style="width: 140px" />
                </div>
                <div class="item">
                    <span>{{i18n_lang.threePay3}}</span>
                    <Select v-model="query.status" style="width:100px">
                        <Option value>{{i18n_lang.threePay6}}</Option>
                        <Option :value="item.id" v-for="(item,i) in statusList" :key="i">{{item.name}}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>{{i18n_lang.threePay4}}</span>
                     <Select v-model="query.pay_config_id" style="width:100px">
                        <Option value>{{i18n_lang.threePay6}}</Option>
                        <Option :value="item.id" v-for="(item,i) in ThirdPayment" :key="i">{{item.name}}</Option>
                    </Select>
                    
                </div>
                <div class="item">
                    <span>{{i18n_lang.threePay5}}</span>
                    <Input v-model="query.pay_inner_order_sn" placeholder clearable style="width: 140px" />
                </div>
                <!--
                <div class="item">
                     <span>{{"交易时间"}}</span>
                </div>
                -->
                <div class="query_btns">
                    <Button type="primary" @click="getData(1)">{{i18n_lang.threePay7}}</Button>
                    <Button type="primary" @click="reset">{{i18n_lang.threePay8}}</Button>
                    <!--
                    <Button type="primary" @click="exportText()">{{"导出"}}</Button>
                    -->
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
        <Modal v-model="paymentFailedModel" :title="i18n_lang.threePay9" :width="500">
          <Form
            ref="pwInfo"
            v-model="paymentFailedData"
            :label-width="100"
          >
            <FormItem :label="i18n_lang.threePay10">
              <Input type="textarea" v-model="paymentFailedData.remark" row="4"/>
            </FormItem>
          </Form>
        <div slot="footer">
            <Button type="primary" :loading="loading.paymentFailed" @click="handleEdit">{{i18n_lang.threePay11}}</Button>
        </div>
    </Modal>

    </div>
</template>
<script>
import columns from './recordColumns.js'
import {formatDateToString} from '@/libs/date'

const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}
const initQuery={
     bank_card_account:'',
    pay_inner_order_sn:'',
    pay_config_id:'',
    status:''
}
export default{
    name:"",
    data(){
        const i18n_lang = this.$t('threePay');
        return{
            i18n_lang:i18n_lang,
            query:{
                ...initQuery
            },
            statusList:[
                {id:1,name:i18n_lang.threePay12},
                {id:2,name:i18n_lang.threePay13},
                {id:0,name:i18n_lang.threePay14}
            ],
            columns:columns(this),
            page: {
                page_size: 10,
                total: 0,
                currentPage: 1
            },
            loading:{
                page:false,
                paymentFailed:false
            },
            paymentFailedData:{
                id:'',
                remark:''
            },
            paymentFailedModel:false, //代付失败状态弹框
            dataSource:[],
            created_at:[initDate.from,initDate.to],
            ThirdPayment:[] //第三方支付数组
        }
    },
    created(){
        this.getThirdPayment();

        this.getData()
    },
    methods:{
        changepage_size(page_size){
            this.page.page_size = page_size
            this.getData()
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
                url: '/transfer',
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

        reset(){
            this.query={
                ...initQuery
            }
              this.created_at = [initDate.from,initDate.to]
            this.getData();
        },
        exportText(){},

        handleOpenModal(type,row){
            if(type=="fail"){
                this.paymentFailedData.id=row.id;
                this.paymentFailedModel=true;
            }
        },
        //操作处理
        async handleEdit(){
            const res = await this.$axios.request({
                url: `/transfer/${this.paymentFailedData.id}`,
                method: 'PUT',
                data:{
                    remark:this.paymentFailedData.remark
                }
            })
            this.paymentFailedModel=false;
            if(res.status !== 200 || res.state !== 0) {
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
        },
        //第三方代付列表
        async getThirdPayment(){
            const res = await this.$axios.request({
                url: '/thirdPayment/tree',
                method: 'get',
                })
                if (res.status !== 200 || res.state !== 0) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.ThirdPayment=res.data
        }
    }
}
</script>
