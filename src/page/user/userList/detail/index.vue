<template>
    <div id="userDetail">
         <Spin v-if="loading.page" size="large" fix></Spin>
        <Button @click="$router.push('/userList')" style="margin-bottom: 30PX;">{{i18n_lang.userDetail12}}</Button>
        <Card dis-hover class="info_box">
           <Row>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail0}}:</p>
                <span>{{userData.id}}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail1}}:</p>
                <span>{{userData.username}}</span>
              </div>
            </Col>
            <!--
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail2}}:</p>
                <span>{{userData.phone || ''}}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail3}}:</p>
                <span>{{userData.userId|| ''}}</span>
              </div>
            </Col>
            -->
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail4}}:</p>
                <span v-if="userData.merchant">{{userData.merchant.name}}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail5}}:</p>
                <span>{{userData.last_order_sn}}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail6}}:</p>
                <span>{{userData.last_order_created_at}}</span>
              </div>
            </Col>
            <!--
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail7}}:</p>
                <span>{{userData.isok || ''}}</span>
              </div>
            </Col>
            -->
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail8}}:</p>
                <span v-if="userData.status === 0" >{{i18n_lang.userDetail9}}</span>
                <span v-else >{{i18n_lang.userDetail10}}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.userDetail11}}:</p>
                <Tag class="item_Tag" v-for="(item,index) in userData.tags" :key="index">{{item.name}}</Tag>
              </div>
            </Col>
           </Row>
           <Row>
            <p>{{i18n_lang.userDetail13}}:</p>
              <Table ref="table" :columns="columns" :data="dataSource" border></Table>
           </Row>
        </Card>
    </div>
</template>
<script >
import columns from './columns.js'
export default {
    name:"",
    data(){
         const i18n_lang = this.$t('userDetail');
        return{
            i18n_lang,
            loading:{
                page:false
            },
            columns:columns(this),
            userData:{},
            dataSource:[]
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getData()
    },
    methods:{
        async getData(){
            this.loading.page=true;
            const res = await this.$axios.request({
                url: `/user/show/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.loading.page=false;
            this.userData=res.data;
            let num_data=res.data.num_data;
            const dataSource=[
              {
                  type:this.i18n_lang.userDetail14,
                  num:num_data.collection_num,
                  total:num_data.collection_total,
                  oknum:num_data.collection_suc_num,
                  oktotal:num_data.collection_suc_total,
                  percent:num_data.collection_percent,
                  type_id:"1"
              },
              {
                  type:this.i18n_lang.userDetail15,
                  num:num_data.pay_num,
                  total:num_data.pay_total,
                  oknum:num_data.pay_suc_num,
                  oktotal:num_data.pay_suc_total,
                  percent:num_data.pay_percent,
                  type_id:"2"
              }
            ]
            this.dataSource=dataSource
        }
        ,
        handleJump(row){
          if(row.type_id==='1'){ //跳充值
            this.$router.push({
                path: `/recharge`,
                query: {
                  user_account: this.userData.user_account
                }
            })
          }else if(row.type_id === '2')//跳提现
          {
            this.$router.push({
                path: `/withdraw`,
                query: {
                  user_account: this.userData.user_account
                }
            })
          }
        }
    }
}
</script>
<style lang="less">
    #userDetail{
        .info_box{
           .item {
                margin-bottom: 18px;
                p,
                span {
                    font-size: 14px;
                    display: inline-block;
                    color: rgb(153, 153, 153);
                    min-width: 70px;
                    margin-right: 5px;
                }
                span {
                    color: rgb(51, 51, 51);
                    &.detail {
                    color: rgb(255, 255, 255);
                    background-color: rgb(45, 140, 240);
                    border-color: rgb(45, 140, 240);
                    padding: 0 8px;
                    border-radius: 3px;
                    margin-bottom: 6px;
                    text-align: center;
                    }
                }
                .item_Tag{
                  text-align: center;
                  font-size: 12px;
                  color: #515a6e;
                }
            }
        }
    }
</style>