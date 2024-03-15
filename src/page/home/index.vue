<template>
    <div id="HomeManage" :class="{'home_bg': showHome}">
        <div v-if="!showHome">home</div>
        <div v-if="showHome">
            <Spin v-if="loading.page" size="large" fix></Spin>
            <Card dis-hover class="query_box">
                <p class="title">
                {{i18n_lang.newhome0}}
                </p>    
                 <div class="card-box">
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome1}}</p>
                        <p class="card_number">{{userTotalData.userTotal}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome2}}</p>
                        <p class="card_number">{{userTotalData.userCanCharge}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome3}}</p>
                        <p class="card_number">{{userTotalData.userNomal}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome4}}</p>
                        <p class="card_number">{{userTotalData.userDisable}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome5}}</p>
                        <p class="card_number">{{userTotalData.newUserToday}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome6}}</p>
                        <p class="card_number">{{userTotalData.merchantTotal}}</p>
                    </Card>
                </div>
            </Card>
            <Card dis-hover class="query_box">
                <p class="title">
                    {{i18n_lang.newhome28}}
                </p>   
                <div class="time-btn">
                    <span class="time-btn-name">{{i18n_lang.newhome7}}</span>
                    <ul class="time-btn-left">
                        <li @click="getCollectionTotal('1')" :class="{'active': collectiontype == '1'}">{{i18n_lang.newhome8}}</li>
                        <li @click="getCollectionTotal('2')" :class="{'active': collectiontype == '2'}">{{i18n_lang.newhome9}}</li>
                        <li @click="getCollectionTotal('3')" :class="{'active': collectiontype == '3'}">{{i18n_lang.newhome10}}</li>
                        <li @click="getCollectionTotal('4')" :class="{'active': collectiontype == '4'}">{{i18n_lang.newhome11}}</li>
                        <li @click="getCollectionTotal('5')" :class="{'active': collectiontype == '5'}">{{i18n_lang.newhome12}}</li>
                        <li @click="getCollectionTotal('6')" :class="{'active': collectiontype == '6'}">{{i18n_lang.newhome13}}</li>
                    </ul>
                </div>
                <div class="card-box">
                     <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome14}}</p>
                        <p class="card_number">{{collectionTotalData.orderNum}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome15}}</p>
                        <p class="card_number">{{collectionTotalData.orderMoney }}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome16}}</p>
                        <p class="card_number">{{collectionTotalData.orderNumSuc }}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome17}}</p>
                        <p class="card_number">{{collectionTotalData.orderNumMoney }}</p>
                    </Card>
                </div> 
                <div class="time-btn">
                    <span class="time-btn-name">{{i18n_lang.newhome18}}</span>
                    <ul class="time-btn-left">
                        <li @click="getPayTotal('1')" :class="{'active': paytype == '1'}">{{i18n_lang.newhome8}}</li>
                        <li @click="getPayTotal('2')" :class="{'active': paytype == '2'}">{{i18n_lang.newhome9}}</li>
                        <li @click="getPayTotal('3')" :class="{'active': paytype == '3'}">{{i18n_lang.newhome10}}</li>
                        <li @click="getPayTotal('4')" :class="{'active': paytype == '4'}">{{i18n_lang.newhome11}}</li>
                        <li @click="getPayTotal('5')" :class="{'active': paytype == '5'}">{{i18n_lang.newhome12}}</li>
                        <li @click="getPayTotal('6')" :class="{'active': paytype == '6'}">{{i18n_lang.newhome13}}</li>
                    </ul>
                </div>
                <div class="card-box">
                     <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome19}}</p>
                        <p class="card_number">{{payTotalData.orderNum}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome20}}</p>
                        <p class="card_number">{{payTotalData.orderMoney}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome16}}</p>
                        <p class="card_number">{{payTotalData.orderNumSuc}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome17}}</p>
                        <p class="card_number">{{payTotalData.orderNumMoney}}</p>
                    </Card>
                </div> 
                <div class="time-btn">
                    <span class="time-btn-name">{{i18n_lang.newhome21}}</span>
                    <ul class="time-btn-left">
                        <li @click="getDisputeTotal('2')" :class="{'active': disputetype == '2'}">{{i18n_lang.newhome9}}</li>
                        <li @click="getDisputeTotal('3')" :class="{'active': disputetype == '3'}">{{i18n_lang.newhome10}}</li>
                        <li @click="getDisputeTotal('4')" :class="{'active': disputetype == '4'}">{{i18n_lang.newhome11}}</li>
                        <li @click="getDisputeTotal('5')" :class="{'active': disputetype == '5'}">{{i18n_lang.newhome12}}</li>
                        <li @click="getDisputeTotal('6')" :class="{'active': disputetype == '6'}">{{i18n_lang.newhome13}}</li>
                    </ul>
                </div>
                <div class="card-box">
                     <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome22}}</p>
                        <p class="card_number">{{disputeTotalData.disputeNum}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome23}}</p>
                        <p class="card_number">{{disputeTotalData.disputeMoney }}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome24}}</p>
                        <p class="card_number">{{disputeTotalData.handleNum}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome25}}</p>
                        <p class="card_number">{{disputeTotalData.handleMoney}}</p>
                    </Card>
                     <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome26}}</p>
                        <p class="card_number">{{disputeTotalData.unhandleNum}}</p>
                    </Card>
                    <Card class="card">
                        <p class="card_title">{{i18n_lang.newhome27}}</p>
                        <p class="card_number">{{disputeTotalData.unhandleMoney}}</p>
                    </Card>
                </div> 
            </Card>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    }),userInfo() {
        return this.$store.state.user.userInfo
      },
  },
  data(){
    const i18n_lang = this.$t('newhome');
    return {
        i18n_lang: i18n_lang,
        showHome: true,
        loading: {
            page: false
        },
        visible: {
            state: false
        },
        indexTopData:{

        },
        userTotalData:{}, //用户统计数据
        collectionTotalData:{}, //代充订单统计
        payTotalData:{}, //待付订单统计
        disputeTotalData:{}, //争议订单统计
        collectiontype:1,
        paytype:1,
        disputetype:2,
        indexSecondActive:{
            field:"online"
        }
    }
  },
 
  created(){
    //this.showHome = this.allRoutes.indexOf(58) > -1 ? true : false;
    //console.log(this.userInfo.merchant_account);

    if(this.userInfo.merchant_account){
        this.showHome=false
    }
    if(this.showHome ){
      this.getUserTotal();
      this.getCollectionTotal();
      this.getPayTotal();
      this.getDisputeTotal();
    }
  },
  methods:{
    echartsLineField(){

    },
    //查询用户统计数据
    async getUserTotal(){
      this.loading.page = true;
      const res = await this.$axios.request({
        url: '/dashboard/user',
        method: 'GET',
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.userTotalData=res.data
      //console.log(res.data)
    },
    //查询代充订单统计
    async getCollectionTotal(type){
        if(type){
          this.collectiontype=type
        }
      
        const res = await this.$axios.request({
          url: '/dashboard/collection',
          method: 'GET',
          params:{
            type:this.collectiontype
          }
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.collectionTotalData=res.data
    },
    //查询代付订单统计
    async getPayTotal(type){
      if(type){
          this.paytype=type
        }
       const res = await this.$axios.request({
          url: '/dashboard/pay',
          method: 'GET',
          params:{
            type:this.paytype
          }
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.payTotalData=res.data
    },
    //查询代付争议订单统计
    async getDisputeTotal(type){
      if(type){
          this.disputetype=type
        }
      const res = await this.$axios.request({
          url: '/dashboard/dispute',
          method: 'GET',
          params:{
            type:this.disputetype
          }
        })
        if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.disputeTotalData=res.data
    }
  }
}
</script>
<style lang="less">
  #HomeManage{
    &.home_bg{
      background-color: #212227;
    }
    .query_box{
      background-color: #212227;
      border: none;
      margin-bottom: 0px;
    }
    .title{
      font-size: 18px;
      padding: 10px 0px;
      padding-left: 10px;
      // border-left: 3px solid #3080fe;
      color: #FBFBFB;
      &>span{
        display: inline-block;
        padding: 5px 10px;
        background: #FFFFFF;
        color: #262830;
        border-radius: 2px;
        font-size: 16px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .card-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      text-align: center;
      margin-top: 10px;
      .card {
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 0;
        min-width: 15%;
        background-color: #2C2F38;
        border: none;
        color: #FBFBFB;
        .card_title{
          font-size: 14px;
        }
        .card_number{
          font-size: 22px;
          &:last-child{
            border: none;
          }
        }
        .card_proportion{
          font-size: 12px;
          .red_text{
            color: red;
          }
          .green_text{
            color: green;
          }
        }
      }
    }
    .time-btn{
        overflow: hidden;
        display: flex;
        align-items: center;
            padding-left: 10px;
        margin: 10px 0px;
        .time-btn-name{
            font-size: 14px;
            color: white;
            margin-right: 12px;
        }
    }
    .time-btn-left{
        display: inline-block;
       overflow: hidden;
      
      &>li{
        display: inline-block;
        padding: 5px 10px;
        background: #FFFFFF;
        border-radius: 2px;
        font-size: 14px;
        margin-left: 10px;
        float: left;
        cursor: pointer;
        &.active{
          color: #FBFBFB;
          background: #3080fe;
        }
        &:first-child{
          margin-left: 0;
        }
      }
    }
  }
</style>
