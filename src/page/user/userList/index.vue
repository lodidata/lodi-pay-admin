<template>
    <div id="userList">
      <Tabs value="name1">
        <!-- 用户列表 -->
          <TabPane :label="i18n_lang.userList16" name="name1">
            <Spin fix v-if="loading.page"></Spin>
            <Card dis-hover class="query_box">
              <div class="query_con mb30">
                <div class="item">
                  <span>{{i18n_lang.userList0}}</span>
                  <Input v-model="query.user_account" style="width:120px;"/>
                </div>
                <div class="item">
                  <span>{{i18n_lang.userList17}}</span>
                  <Select v-model="query.merchant_id" style="width:100px">
                    <Option value>{{i18n_lang.userList18}}</Option>
                    <Option :value="item.id" v-for="(item,i) in merchantList" :key="i">{{item.name}}</Option>
                  </Select>
                </div>
                <div class="item">
                  <span>{{i18n_lang.userList19}}</span>
                  <Select v-model="query.tag_id" style="width:100px">
                    <Option value>{{i18n_lang.userList18}}</Option>
                    <Option :value="item.id" v-for="(item,i) in tagList" :key="i">{{item.name}}</Option>
                  </Select>
                </div>
                <div class="item">
                  <span>{{i18n_lang.userList2}}</span>
                  <Select v-model="query.status" style="width:100px">
                    <Option value>{{i18n_lang.userList18}}</Option>
                    <Option :value="item.id" v-for="(item,i) in stateList" :key="i">{{item.name}}</Option>
                  </Select>
                </div>
                <div class="query_btns">
                  <Button type="primary" @click="getData()">{{i18n_lang.userList20}}</Button>
                  <Button type="primary" @click="reset()">{{i18n_lang.userList21}}</Button>
                </div>
              </div>
              <!-- <Button type="primary" @click="handle('add')">新增</Button> -->
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
          </TabPane>
      </Tabs>
      

      <!-- 标签 -->
    <Modal
      v-model="visible.addModel"
      :title="i18n_lang.userList9"
      :width="500"
      @on-cancel="visible.addModel = false"
    >
      <Spin v-if="loading.add" size="large" fix></Spin>
      <div>
        <Tag color="primary" v-for="(i, index) in checkTagList" :key="index" size="medium" :name="i.id" closable @on-close="closeTag">{{ i.name }}</Tag>
      </div>
      <Divider />
      <div>{{i18n_lang.userList10}}</div>
      <div>
        <Tag color="primary" v-for="(i, index) in tagList" :key="index" size="medium" @click.native="chooseTag(index)">{{ i.name }}</Tag>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="loading.add" @click="save">{{i18n_lang.userList11}}</Button>
      </div>
    </Modal>
    
    </div>
  </template>
  
  <script>
  import columns from './columns.js'
  let initData = {
    name: '',
  }
  export default {
    data () {
      const i18n_lang = this.$t('userList');
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
        i18n_lang,
        columns: columns(this),
        dataSource: [],
        page: {
          page_size: 10,
          total: 0,
          currentPage: 1
        },
        query: {
          user_account: '',
          merchant_id: '',
          tag_id: '',
          status: '',
        },
        dataValue: [, ], // 默认日期
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() - 86400000
          }
        },
        tagList: [],
        merchantList: [],
        stateList: [{ id: 1, name: i18n_lang.userList6 }, { id: 0, name: i18n_lang.userList13 }], // 状态数据
        addForm: {...initData},
        editType: 'add', // 修改类型
        addRuleValidate: {
            name: [{ required: true, message: i18n_lang.userList12 }],
        },
      }
    },
    created () {
      this.getData()
      this.getTags()
      this.getMerchant()
    //   this.getRole()
    },
    computed: {
      checkTagList() {
        return this.tagList.filter(item => {
          return item.isCheck
        })
      }
    },
    methods: {
      // 添加
       async handleEdit (row, type) {
        if (type === 'add') {
            this.editType = type
            this.visible.addModel = true
            this.addForm = Object.assign({}, initData)
            const arr = row.tags.map(item => item.id)
            this.tagList.forEach(item => {
              item.isCheck = arr.includes(item.id) ? 1 : 0
            })
            this.addForm.id = row.id
        }else if(type === 'detail'){
          this.$router.push({
            path: `userList/detail`,
            query: {
              id: row.id
            }
        })
        }
      },
      // 保存用户信息
      async save () {
        if (this.editType === 'add') {
          this.add()
        }
      },
      // 新增接口
      // 编辑接口
      async add () {
        if (!this.checkTagList.length) {
          this.$Message.error(this.i18n_lang.userList14)
          return;
        }
        const { id } = this.addForm;
        const tags = this.checkTagList.map(item => item.id)
        const res = await this.$axios.request({
          url: `/user/${id}`,
          method: 'PUT',
          data: {
            tags
          }
        })
        if (res.state !== 0) {
          this.$Message.error(res.message)
        } else {
            this.visible.addModel = false
            this.$Message.success(this.i18n_lang.userList15)
            this.getData()
        }
      },
      // 获取标签树
      async getTags() {
        await this.$axios.request({
          url: '/tag/tree?status=1',
          method: 'get',
        }).then(res => {
          if (res.state === 0) {
            this.tagList = res.data.map(item => {
              return {...item, isCheck: 0}
            })
          }
        })
      },
      // 获取站点
      async getMerchant() {
        await this.$axios.request({
          url: 'merchant/tree',
          method: 'get',
        }).then(res => {
          if (res.state === 0) {
            this.merchantList = res.data
          }
        })
      },
      async getData (i=1) {
        
       
        if (i) this.page.currentPage = i;

        this.loading.page++
        let query = {
          page: this.page.currentPage,
          page_size: this.page.page_size,
          ...this.query
        }
        const res = await this.$axios.request({
          url: '/user',
          method: 'get',
          params: query
        })
        if (res.state !== 0) {
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
      // 启用停用
      async handleStop(row){
          let res = await this.$axios.request({
              url: `/user/${row.id}`,
              method: 'put',
              data: {
                status: !row.status
              }
          })
          if (res.state !== 0) {
              this.$Message.error(res.message)
          } else {
              this.$Message.success(res.message)
              this.getData()
          }
      },
      reset () {
        this.query = {
          id: '',
          merchant_id: '',
          tag_id: '',
          status: '',
        }
        this.page = {
          page_size: 10,
          total: 0,
          currentPage: 1
        }
        this.getData()
      },
      chooseTag(index) {
        this.tagList[index].isCheck = 1;
      },
      closeTag(event, id) {
        const index = this.tagList.findIndex(item => item.id === id)
        this.tagList[index].isCheck = 0;
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
  
  <style>
  </style>