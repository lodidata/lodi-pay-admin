import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('systemRole');
  return [
    {
      title: i18n.systemRole0,
      key: 'role_name',
      align: 'center'
    },
    {
      title: i18n.systemRole1,
      key: 'admin_role_count',
      align: 'center',
      sortable: true
    },
    {
      title:i18n.systemRole2,
      key: 'created_at',
      align: 'center'
    },
    {
      title: i18n.systemRole3,
      key: 'admin_name',
      align: 'center'
    },
    {
      title: i18n.systemRole4,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              size='small'
              type='primary'
              style='margin-right:5px'
              v-btn={26}
              on-click={_ => Vue.handleOpenModal(row)}
            >
            {i18n.systemRole5}
            </Button>
            {
                row.role_name!='商户'?
                <Poptip confirm title={`${i18n.systemRole7} ${row.role_name} ?`}    on-on-ok={_ => Vue.handleDetele(row)}>
                  <Button size='small' type='error'  v-btn={28} >
                  {i18n.systemRole6}
                  </Button>
                </Poptip>
                :''
            }
          </div>
        )
      }
    }
  ]
}
