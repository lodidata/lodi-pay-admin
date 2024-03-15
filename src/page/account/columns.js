import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('systemCcountList');
  return [
    {
        title: 'ID',
        key: 'id',
        align: 'center'
    },
    {
        title: i18n.systemCcountList0,
        key: 'admin_name',
        align: 'center'
    },
    {
        title: i18n.systemCcountList1,
        key: 'real_name',
        align: 'center'
    },
    // {
    //     title: '部门',
    //     key: 'brand_name',
    //     align: 'center'
    // },
    // {
    //     title: '职位',
    //     key: 'site_url',
    //     align: 'center'
    // },
    {
        title: i18n.systemCcountList2,
        key: 'role_name',
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>
              {row.admin_role_relation?row.admin_role_relation.role_name:''}
            </span>
          )
        }
    },
    {
        title: i18n.systemCcountList3,
        key: 'last_login_ip',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.systemCcountList4,
        key: 'last_login_time',

        minWidth: 140,
        align: 'center'
    },
    {
      title: i18n.systemCcountList5,
      minWidth: 50,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            {
                <Poptip
                confirm
                title={`${i18n.systemCcountList9}${row.status == 0 ? i18n.systemCcountList7 : i18n.systemCcountList8} ${row.admin_name} `}
                on-on-ok={_ => Vue.handleStop(row)}
                >
                    <Button
                        type={row.status === 0 ? 'error' : 'success'}
                        size='small'
                        style='margin-right:5px'
                        >
                        {row.status === 0 ? i18n.systemCcountList8 : i18n.systemCcountList7}
                    </Button>
                </Poptip>
            }
          </div>
        )
      }
    },
    {
      title: i18n.systemCcountList6,
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={22}
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              {i18n.systemCcountList10}
            </Button>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={45}
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
             {i18n.systemCcountList11}
            </Button>
            <Poptip
              confirm
              title={i18n.systemCcountList13}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' size="small"   v-btn={24}>
              {i18n.systemCcountList12}
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