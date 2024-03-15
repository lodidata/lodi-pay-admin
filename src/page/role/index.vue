<template>
  <div id="AdminRole">
    <Spin v-if="loading.page" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.systemRole0}}</span>
          <Input v-model="query.role_name" placeholder clearable style="width: 140px" />
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" v-auth="25" @click="getData(1)">{{i18n_lang.systemRole8}}</Button>
        </div>
      </div>
    </Card>

    <Button type="primary" icon="md-add" v-auth="27" @click="handleOpenModal('')">{{i18n_lang.systemRole9}}</Button>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
      `${i18n_lang.systemRole10}：${page.total}${i18n_lang.systemRole11}` }}</div>
    <!-- <Page
      class="page_box"
      show-sizer
      
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page> -->

    <!-- 编辑 -->
    <Modal v-model="visible.modal" :title="editType === 'add' ? `${i18n_lang.systemRole12}` : `${i18n_lang.systemRole13}`" :width="600" :styles="{ top: '20px' }">
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form v-if="visible.modal" ref="editForm" label-position="top" :model="editInfo" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.systemRole14}`" prop="role_name">
          <Input v-model="editInfo.role_name" />
        </FormItem>
        <FormItem :label="`${i18n_lang.systemRole15}`">
          <Tree ref="tree" :data="editInfo.authTree" show-checkbox></Tree>
        </FormItem>
        <!-- <FormItem label="会员权限：">
          <Checkbox v-model="editInfo.user.true_name">会员真实姓名</Checkbox>
          <Checkbox v-model="editInfo.user.bank_card">会员银行信息</Checkbox>
          <Checkbox v-model="editInfo.user.address_book">会员联系信息</Checkbox>
          <Checkbox v-model="editInfo.user.kefu_phone">客服电话信息</Checkbox>
        </FormItem>
        <FormItem label="显示权限：">
          <RadioGroup v-model="editInfo.user_search_switch">
            <Radio label="false">显示会员</Radio>
            <Radio label="true">隐藏会员</Radio>
          </RadioGroup>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.edit" @click="save">{{i18n_lang.systemRole16}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns.js'

const initQuery = {
  role_name: ''
}

const initEdit = {
  id: '',
  role_name: '',
  authTree: [],
  user_search_switch: 'false',
  user: {
    address_book: '',
    bank_card: '',
    true_name: '',
    kefu_phone: ''
  }
}

export default {
  data() {
    const i18n_lang = this.$t('systemRole');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        edit: false
      },
      visible: {
        modal: false
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      query: { ...initQuery },
      columns: columns(this),
      dataSource: [],
      emptyAuthTree: [],
      editInfo: { ...initEdit },
      editType: 'add',
      ruleValidate: {
        role: [{ required: true, message: i18n_lang.systemRole17 }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
     
      const res = await this.$axios.request({
        url: '/admin/role',
        method: 'get',
        params: {
          ...this.query,
          page: this.page.currentPage,
          page_size: this.page.pageSize,
        }
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      this.dataSource = res.data
      this.loading.page = false
      // this.page.total = res.data
    },
    // 删除角色
    async handleDetele(row) {
      this.loading.page = true
      const res =  await this.$axios.request( {
        url:`/admin/role/${row.id}`,

        method: 'DELETE'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.visible.modal = false
        this.getData()
      }
    },
    async handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      if (row) {
        await this.getItem(row)
      } else {
        await this.getEmpty()
      }
      this.visible.modal = true
    },
    // 获取空的auth规则
    async getEmpty() {
      if (this.emptyAuthTree.length) {
        this.editInfo = Object.assign({}, initEdit)
        this.editInfo.authTree = JSON.parse(JSON.stringify(this.emptyAuthTree))
      } else {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/admin/role/auth/tree', 

          method: 'GET'
        })
        this.loading.page = false

        if (res.status !== 200 || res.state !== 0) {
          this.$Message.error(res.message)
          return
        }
        this.editInfo = { ...res.data }

        this.editInfo.user_search_switch = this.editInfo.user_search_switch ? 'true' : 'false'
        this.editInfo.authTree = res.data.tree
        this.emptyAuthTree = res.data.tree
      }
    },
    // 获取单个权限
    async getItem(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/admin/role/auth/tree/${row.id}`,

        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state !== 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }

      this.editInfo = { ...res.data }

      this.editInfo.user_search_switch = this.editInfo.user_search_switch ? 'true' : 'false'
      this.editInfo.authTree = res.data.tree
      this.emptyAuthTree = res.data.tree
      this.editInfo.role_name = row.role_name
      this.editInfo.id = row.id
    },
    // 保存
    async save() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        this.loading.edit = true;
        
        const auth = this.$refs.tree.getCheckedAndIndeterminateNodes().map(x => x.id);

        const req = {
          auth: auth.join(','),
          role_name: this.editInfo.role_name,
          // member_control: this.editInfo.user,
          //user_search_switch: this.editInfo.user_search_switch !== 'false'
        }
        const id = this.editType === 'edit' ? this.editInfo.id : ''
        const res = await this.$axios.request({
          url: `/admin/role/${id}`,

          method: this.editType === 'edit' ? 'PUT' : 'POST',
          data: req
        })
        this.loading.edit = false
        if (res.status !== 200 || res.state !== 0) {
          this.$Message.error(res.message)
        } else {
          this.$Message.success(res.message)
          this.visible.modal = false
          this.getData()
        }

      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
