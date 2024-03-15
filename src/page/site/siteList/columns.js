import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('siteList');
  return [
    {
        title: i18n.siteList0,
        key: 'id',
        minWidth: 80,
        align: 'center'
    },
    {
        title: i18n.siteList1,
        key: 'name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.siteList2,
        key: 'real_name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.siteList3,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
            return (
                <div>
                    {!row.order_complete_method ? i18n.siteList11 : i18n.siteList12}
                </div>
            )
        }
    },
    {
        title: i18n.siteList4,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${i18n.siteList13}${row.is_pay_behalf == 0 ? i18n.siteList14 : i18n.siteList15} ${i18n.siteList16} `}
                    on-on-ok={_ => Vue.handleStop(row, 'pay')}
                    >
                        <Button
                            type={row.is_pay_behalf === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px'
                            >
                            {row.is_pay_behalf === 0 ? i18n.siteList15 : i18n.siteList14}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    {
        title: i18n.siteList5,
        key: 'pay_behalf_level',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.siteList6,
        key: 'pay_behalf_point',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.siteList7,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${i18n.siteList13}${row.is_collection_behalf == 0 ? i18n.siteList14 : i18n.siteList15} ${i18n.siteList17} `}
                    on-on-ok={_ => Vue.handleStop(row, 'collection')}
                    >
                        <Button
                            type={row.is_collection_behalf === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px'
                            >
                            {row.is_collection_behalf === 0 ? i18n.siteList15 : i18n.siteList14}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    {
        title: i18n.siteList8,
        key: 'collection_pay_level',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.siteList9,
        key: 'collection_pay_point',
        minWidth: 140,
        align: 'center'
    },
    {
      title: i18n.siteList10,
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              {i18n.siteList18}
            </Button>
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
              改密
            </Button>
            <Poptip
              confirm
              title="确认删除 ?"
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' size="small">
                删除
              </Button>
            </Poptip> */}
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