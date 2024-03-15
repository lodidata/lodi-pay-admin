<template>
  <div id="AdminRole">
    <Spin v-if="loading.page" fix></Spin>



    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
      `数据总计：${page.total}条` }}</div>
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
    <Modal v-model="visible.modal" :title="editType === 'add' ? `${i18n_lang.systemSetting9}` : `${i18n_lang.systemSetting8}`" :width="600" :styles="{ top: '20px' }">
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form v-if="visible.modal" ref="editForm" label-position="top" :model="editInfo" :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.systemSetting1}: `" prop="name">
          <Input v-model="editInfo.name" />
        </FormItem>
        <FormItem :label="`${i18n_lang.systemSetting2}: `" prop="key">
          <Input v-model="editInfo.key" />
        </FormItem>
        <FormItem :label="`${i18n_lang.systemSetting3}: `" prop="description">
          <Input v-model="editInfo.description" type="textarea" :rows="4" :placeholder="i18n_lang.systemSetting10" />
        </FormItem>
        <FormItem :label="`${i18n_lang.systemSetting4}: `"  v-if="editInfo.content.type === 'percent'">
          <Input v-model="editInfo.content.value" >
            <span slot="append">%</span>
          </Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.systemSetting4}: `"  v-if="editInfo.content.type === 'boolean'">
          <i-switch size="large" v-model="editInfo.content.value">
            <span slot="open">{{i18n_lang.systemSetting11}}</span>
            <span slot="close">{{i18n_lang.systemSetting12}}</span>
          </i-switch>
        </FormItem>
        <FormItem :label="`${i18n_lang.systemSetting4}: `"  v-if="editInfo.content.type === 'number'">
          <Input v-model="editInfo.content.value" >
            
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.edit" @click="save">{{i18n_lang.systemSetting13}}</Button>
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
  name: '',
  key: '',
  description: '',
  value_type: "",
  value_boolean: "",
  value: '',
}

export default {
  data() {
     const i18n_lang = this.$t('systemSetting');
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
      row: {

      },
      query: { ...initQuery },
      columns: columns(this),
      dataSource: [],
      emptyAuthTree: [],
      editInfo: { ...initEdit },
      editType: 'add',
      ruleValidate: {
        key: [{ required: true, message: i18n_lang.systemSetting14 }],
        name: [{ required: true, message: i18n_lang.systemSetting14 }],
        description: [{ required: true, message: i18n_lang.systemSetting14 }],
      
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
        url: '/settings',
        method: 'get',

      })
      if (res.status !== 200 || res.state !== 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      res.data.forEach(e=>{
       // e.content = JSON.parse(e.content)
        if(e.content.type === 'boolean'){
          e.content.value =  e.content.value === 1 ?  true : false
        }
      })
      console.log(res.data)
      this.dataSource = res.data
      this.loading.page = false
      // this.page.total = res.data
    },


    handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      this.editInfo =JSON.parse(JSON.stringify(row)) ;
      //console.log(this.editInfo)
      this.visible.modal = true
    },


    // 保存
    async save() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        this.loading.edit = true
        if(this.editInfo.content.type === 'boolean') {
          this.editInfo.content.value  = this.editInfo.content.value ? 1 :0  
        }
        let obj = {
         
          name: this.editInfo.name,
          key: this.editInfo.key,
          description: this.editInfo.description,
          content: JSON.stringify(this.editInfo.content)
        }

        const res = await this.$axios.request({
          url: `/settings/${this.editInfo.id}`,

          method: this.editType === 'edit' ? 'PUT' : 'POST',
          data: obj
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
 