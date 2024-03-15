<template>
    <div id="Account">
      <!--
        <Button @click="$router.push('/withdraw')" style="margin-bottom: 30PX;">{{i18n_lang.withdrawDetail9}}</Button>
        -->
        <Spin fix v-if="loading.page"></Spin>
        <div >
            <Card :bordered="false">
                <template #title>{{i18n_lang.withdrawDetail10}}</template>
                <Table :columns="columns" :data="data_main" border></Table>
            </Card>
            <Card :bordered="false" style="margin-top: 20px;">
                <template #title>{{i18n_lang.withdrawDetail11}}</template>
                <Table :columns="columnsOther" :data="data_other" border></Table>
            </Card>
        </div>
    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import columnsOther from './columnsOther.js'
  import { mapState } from 'vuex'

  export default {
    props:{
        id:Number
    },
    data () {
      const i18n_lang = this.$t('withdrawDetail');
      return {
        loading: {
          page: 0,
          addBtn: false,
          ipBtn: false,
          password: false
        },
        i18n_lang,
        visible: {
          addModel: false,
          password: false
        },
        columns: columns(this),
        columnsOther: columnsOther(this),
        data_main: [],
        data_other: [],
        page: {
          page_size: 10,
          total: 0,
          page: 1
        },
        
      }
    },
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    created () {
        //this.id = this.$route.query.id;
        this.getData()
    },
    methods: {
        async getData (i) {
            if (i) this.page.currentPage = i;
                this.loading.page++
                let query = {
                page: this.page.page,
                page_size: this.page.page_size,
            }
            const res = await this.$axios.request({
                url: `/orders/pay/show/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.data_main = [res.data]
            if (res.data.matched.length) {
                res.data.matched.forEach(item => {
                    item['order_sn'] = res.data['order_sn']
                    item['user_accounts'] = res.data['user_account']
                   
                  
                   
                })
                this.data_other = res.data.matched
            }

            // this.data_other = res.data.matched ? res.data.matched : []
            this.loading.page--
            // this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
            // this.dataSource = res.data
            // this.loading.page--
      },
      async handleDispute(row) {
        const res = await this.$axios.request({
            url: `/orders/matched/controversial`,
            method: 'post',
            data: {
              orders_collection_sn: row.inner_order_sn
            }
        })
        if (res.state !== 0) {
          this.$msg({
              type: 'error',
              message: res.message
          })
          return
        } else {
          this.$msg({
              type: 'success',
              message: res.message
          })
          this.getData()
        }
      },
      handleEdit(row,type){
        //判断是否有跳转匹配订单的权限
        let isMatch = this.allRoutes.indexOf(34) > -1 ? true : false;
        if(!isMatch){//没有权限
         this.$msg({
              type: 'error',
              message: this.i18n_lang.withdrawDetail31
          })
          return
        }
        //查看匹配订单
        if(type==="match"){
           //row.inner_order_sn
          this.$router.push({
              path: `/match`,
              query: {
                pay_inner_order_sn: row.inner_order_sn
              }
          })
        }else if(type==="detail"){
           this.$router.push({
            path: `/match`,
            query: {
               pay_inner_order_sn: row.pay_inner_order_sn
            }
        })
        }
      }
      // 设置每页条数
    //   changepage_size (page_size) {
    //     this.page.page_size = page_size
    //     this.getData()
    //   },
    //   // 翻页
    //   changePage (val) {
    //     this.page.page = val
    //     this.getData()
    //   },
    }
  }
  </script>
  
  <style>
  </style>