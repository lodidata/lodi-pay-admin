<template>
    <div id="disputeDetail">
        <!--
        <Button @click="$router.push('/dispute')" style="margin-bottom: 30PX;">{{i18n_lang.orderDetail17}}</Button>
        -->
        <Card dis-hover class="query_box creat-disputeDetail" v-if="loading">
           
            <Col span="11" style="margin-right:5px;">
                <p>{{i18n_lang.orderDetail0}} <span style="color:black">({{detailData.status_label}})</span></p>
                <!--
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail2}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_collection">
                        {{ detailData.order_collection.inner_order_sn || ''}}
                    </div>
                </div>
              -->
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail3}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.inner_order_sn}}
                           <Button
                            style="margin-right:5px"
                            type="primary"
                            @click="onCopy(detailData.order_pay.inner_order_sn)"
                            size="small">
                              {{i18n_lang.orderDetail19}}
                        </Button>
                        <Button
                            style="margin-right:5px"
                            type="primary"
                            @click="onjump('withdraw',detailData.order_pay.inner_order_sn)"
                            size="small">
                             {{i18n_lang.orderDetail20}}
                        </Button>
                    </div>
                </div>
                 
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail4}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.order_sn}}
                    </div>
                </div>
                
                 <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail5}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.order_pay?detailData.order_pay.created_at:''}}
                    </div>
                </div>
                
                 <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail6}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.merchant_account}}
                    </div>
                </div>
                 
                 <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail7}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.payment}}
                    </div>
                </div>
               
                 <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail8}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.user_account}}
                    </div>
                </div>
              
                 <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail9}}:
                    </div>
                    <div class="item_val" v-if="detailData.order_pay">
                          {{detailData.order_pay.amount}}
                    </div>
                </div>
                <!--
                <div v-if="detailData.order_pay && detailData.order_pay.attachment">
                    <h3>{{i18n_lang.orderDetail10}}</h3>
                    <div class="item">
                        <div class="item_name">
                            {{i18n_lang.orderDetail11}}:
                        </div>
                        <div class="item_val" v-if="detailData.order_pay">
                            {{detailData.order_pay.attachment.created_at}}
                        </div>
                    </div>
                    <div>
                        <img v-for="(item,index) in detailData.order_pay.attachment.url" :key="index"  :src="item"/>
                    </div>
            
                </div>
                -->
            </Col>
                <Col span="11">
                <p>{{i18n_lang.orderDetail12}}</p>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail13}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.inner_order_sn}}
                          <Button
                            style="margin-right:5px"
                            type="primary"
                            @click="onCopy(detailData.inner_order_sn)"
                            size="small">
                            {{i18n_lang.orderDetail19}}
                        </Button>
                        <Button
                            style="margin-right:5px"
                            type="primary"
                            @click="onjump('recharge',detailData.inner_order_sn)"
                            size="small">
                            {{i18n_lang.orderDetail20}}
                        </Button>
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail4}}:
                    </div>
                    <div class="item_val" >
                        {{detailData.order_sn}}
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail5}}:
                    </div>
                    <div class="item_val" >
                           {{detailData.created_at}}
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail6}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.merchant_account}}
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail14}}:
                    </div>
                    <div class="item_val">
                          {{detailData.payment}}
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail15}}:
                    </div>
                    <div class="item_val" >
                          {{detailData.user_account}}
                    </div>
                </div>
                <div class="item">
                    <div class="item_name">
                        {{i18n_lang.orderDetail16}}:
                    </div>
                    <div class="item_val">
                          {{detailData.amount}}
                    </div>
                </div>
                <div v-if="detailData && detailData.attachment">
                    <h3>{{i18n_lang.orderDetail10}}</h3>
                    <div class="item">
                        <div class="item_name">
                            {{i18n_lang.orderDetail11}}:
                        </div>
                        <div class="item_val">
                            {{detailData.attachment.created_at}}
                        </div>
                    </div>
                    <div >
                        <div class="item_name">
                            {{i18n_lang.orderDetail23}}:
                        </div>
                        <div class="item_val" v-if="detailData.order_pay">
                            {{detailData.attachment.remark}}
                        </div>
                    </div>
                    <div>
                        <img v-for="(item,index) in detailData.attachment.url"  @click="showImg(item)" :key="index"  :src="item"/>
                    </div>
                </div>
            </Col>
            
        </Card>
        <!-- 查看图片 -->
         <image-preview ref="imgPreviewRef"></image-preview>
    </div>
</template>

 <script>
import imagePreview from "../image-preview/imagePreview.vue"

export default {
       components:{
        imagePreview
    },
    data () {
      const i18n_lang = this.$t('orderDetail');
      return {
        i18n_lang:i18n_lang,
        detailData:{},
        loading:false
      }
    },
    props:{
        id:Number
    },
     
    created () {
       // this.id = this.$route.query.id;
        this.getData()
    },
    methods:{
        async getData(){
            this.loading=false;
             const res = await this.$axios.request({
                url: `/orders/trial/show/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.loading=true;
            this.detailData=res.data.order_collection;

            //console.log(res.data)
        },
        //复制
        onCopy(text){
            this.$copyText(text).then(e => {

                this.$msg({ type: 'success', message: this.i18n_lang.orderDetail21 })
            }, e => {
                this.$msg({ type: 'error', message:this.i18n_lang.orderDetail22 })
            }, e => {
            })
        },
        onjump(type,inner_order_sn){
            if(type==="withdraw"){
                this.$router.push({
                    path: `/withdraw`,
                    query: {
                    inner_order_sn: inner_order_sn
                    }
                })
            }else if(type ==="recharge"){
                 this.$router.push({
                    path: `/recharge`,
                    query: {
                    inner_orders_pay_sn: inner_order_sn
                    }
                })
            }
        },
        showImg(url){
            this.$refs.imgPreviewRef.loadImages([url]);
        }
    }
 }
 </script>

 <style lang="less">
 #disputeDetail{
    .creat-disputeDetail{
        overflow: hidden;
        background-color: white;
        padding: 10px;
        p{
            color:#2d8cf0
        }
        img{
            width: 80px;
            height: 80px;
            margin: 10px;
        }
    }
    .ivu-col-span-11{
        padding: 0px 10px;
    }
    .item{
       display: flex;
       justify-content: space-between; 
       margin-top: 10px;
       font-size: 14px;
       line-height: 30px;
       height: 30px;
      
    }
 }
 </style>