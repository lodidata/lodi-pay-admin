<template>
    <div id="Account">
      <Spin fix v-if="loading.page"></Spin>
        <date-more :dates.sync="created_at" :title="i18n_lang.financialStatements17" ></date-more>
      <Card dis-hover class="query_box">
    
        <div class="query_con mb30">
          <!-- <div class="item">
            <span>{{i18n_lang.financialStatements0}}</span>
            <Input v-model="query.merchant_id" style="width:120px;"/>
          </div> -->
         
          <div class="item">
            <span>{{i18n_lang.financialStatements1}}</span>
            <Input v-model="query.merchant_name" style="width:120px;"/>
          </div>
          <!--
          <div class="item">
            <span>{{i18n_lang.financialStatements17}}</span>
            <DatePicker v-model="created_at" type="daterange" :editable="false"
                  format="yyyy-MM-dd" placement="bottom-end"  :placeholder="i18n_lang.financialStatements18" style="width: 220px" clearable>
              </DatePicker>
          </div>-->
          <div class="query_btns">
            <Button type="primary" @click="getData(1)">{{i18n_lang.financialStatements9}}</Button>
            <Button type="primary" @click="reset">{{i18n_lang.financialStatements10}}</Button>
            <Button type="primary" :loading="loading.export" @click="exportTxt">{{i18n_lang.financialStatements15}}</Button>
          </div>
        </div>
    
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

    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  import { formatDateToString } from '@/libs/date'
  
  const initDate ={
    from:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    to:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
  }
  const initPw = {
    id: '',
    password: '',
    password_confirm: '',
  }
  export default {
    components: {
      
    },
    data () {
      const i18n_lang = this.$t('financialStatements');
      return {
        loading: {
          page: 0,
          export:false
        },
        visible: {
          addModel: false,
          password: false
        },
        options: {
            disabledDate(date) {
                return date && date.valueOf() > Date.now()
            }
        },
        i18n_lang,
        columns: columns(this),
        dataSource: [],
        created_at: [initDate.from,initDate.to],
        page: {
          page_size: 10,
          total: 0,
          currentPage: 1
        },
        query: {
          merchant_id: '',
          merchant_name: '',
         
        },
        
      }
    },
    created () {
      this.getData()
 
    },
    methods: {
      async getData (i = 1) {
        if(i){
            this.page.currentPage=i;
        }
        this.loading.page=true;

         let arr = []
        let m, y;

        if (this.created_at[0] != '') {
          m = formatDateToString(new Date(this.created_at[0]))
          y = formatDateToString(new Date(this.created_at[1])) 
          arr = [m, y]
        } else {
          arr = []
        }
        const res = await this.$axios.request({
          url: '/financialStatements',
          method: 'get',
          params: {
            page: this.page.currentPage,
            page_size: this.page.page_size,
            ...this.query,
            finance_date:arr
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.loading.page=false;
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.dataSource = res.data
      
      },
      //跳转详情
      handleDetail(row){
        this.$router.push({
            path: `/financialStatements/detail`,
            query: {
              merchant_account: row.merchant.account
            }
        })
      },
      //
      handleJump(type,row){
        //console.log(row.merchant_account)
         if(type === "recharge"){
            this.$router.push({
                path: `/recharge`,
                query: {
                  merchant_account: row.merchant.account
                }
            })
         }else if(type === "match"){
            this.$router.push({
                path: `/match`,
                query: {
                  merchant_account: row.merchant.account
                }
            })
         }else if(type === "withdraw"){
            this.$router.push({
                path: `/withdraw`,
                query: {
                  merchant_account: row.merchant.account
                }
            })
         }
      },
      reset () {
        this.query = {
            merchant_id: '',
            merchant_name: '',
        }
        this.created_at=[initDate.from,initDate.to];
        this.getData()
      },
      //导出
      async exportTxt(){
          this.loading.export=true;
          const res = await this.$axios.request({
            url: '/financialStatements/export',
            method: 'get',
            responseType: 'blob',
            params: {
              ...this.query
            }
          })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
         this.$msg({
            type: 'success',
            message: this.i18n_lang.financialStatements16
          })
        this.loading.export=false;
        const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

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
      
    }
  }
  </script>
 