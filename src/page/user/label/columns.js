import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('userLabel');
  return [
    {
        title: i18n.userLabel0,
        type: 'index',
        minWidth: 80,
        align: 'center'
    },
    {
        title: i18n.userLabel1,
        key: 'name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.userLabel2,
        key: 'description',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.userLabel3,
        key: 'user_tag_count',
        minWidth: 50,
        align: 'center'
    },
    {
        title: i18n.userLabel4,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
            return (
                <div>
                    {row.creator ? row.creator.admin_name : ''}
                </div>
            )
        }
    },
    {
        title: i18n.userLabel5,
        key: 'created_at',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.userLabel6,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${i18n.userLabel22}${row.status == 0 ? i18n.userLabel8 : i18n.userLabel10} `}
                    on-on-ok={_ => Vue.handleStop(row, 'pay')}
                    >
                        <Button
                            type={row.status === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px'
                            >
                            {row.status === 0 ? i18n.userLabel9 : i18n.userLabel8}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    {
      title: i18n.userLabel7,
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={15}
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              {i18n.userLabel11}
            </Button>
            <Poptip
              confirm
              title= {i18n.userLabel13}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' v-btn={17} size="small">
              {i18n.userLabel12}
              </Button>
            </Poptip>
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