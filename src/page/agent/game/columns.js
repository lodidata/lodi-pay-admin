import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    {
        title: 'ID',
        key: 'id',
        align: 'center'
    },
    {
        title: '厂商',
        key: 'menu_type',
        align: 'center'
    },
    {
        title: '管理后台地址',
        key: 'admin_url',
        align: 'center'
    },
    {
        title: '后台账户',
        key: 'agent_account',
        align: 'center'
    },
    {
        title: '后台密码',
        key: 'password',
        minWidth: 140,
        align: 'center'
    },
    {
      title: '状态',
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          
          <div>
            <Poptip
              confirm
              title={`确认 ${Number(row.status) === 1 ? '停用' : '启用'} ?`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button type={Number(row.status) === 1 ? 'success' : 'error'} size="small">
                {Number(row.status) === 1 ? '启用' : '停用'}
              </Button>
            </Poptip>
          </div>
        )
      }
    },
    {
        title: '开通时间',
        key: 'created_at',
        align: 'center'
    },
    {
        title: '更新时间',
        key: 'updated_at',
        align: 'center'
    },
    {
      title: '操作',
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`确认 ${'删除'} ?`}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button style="margin-right:5px" type="error" size="small">
                {'删除'}
              </Button>
            </Poptip>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row)}
            >
              编辑
            </Button>
          </div>
        )
      },
      myExt: {
        label: 'handle',
        require: true
      }
    }
  ]
}