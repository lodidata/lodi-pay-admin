import { Button, Poptip, Tooltip ,Icon  } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('withdraw');
  return [
    {
        title: i18n.withdraw0,
        type: 'index',
        align: 'center',
        minWidth: 50,
    },
    {
        title: i18n.withdraw1,
        key: 'inner_order_sn',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw2,
        key: 'order_sn',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw3,
        key: 'created_at',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw4,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.merchant ? row.merchant.name : ''}</span>
          )
        }
    },
    {
        title: i18n.withdraw5,
        key: 'payment',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw6,
        key: 'user_account',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw7,
        key: 'amount',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdraw8,
        key: 'currency',
        minWidth: 140,
        align: 'center'
    },
    {/**已成功金额 */
      title: i18n.withdraw9,
      key: 'success_amount',
      minWidth: 80,
      align: 'center'
    },
    {/**进行中金额 */
      title: i18n.withdraw42,
      key: 'handling_amount',
      minWidth: 80,
      align: 'center'
    },
    {/**已失败金额 */
      title: i18n.withdraw32,
      align: 'center',
      minWidth: 80,
      renderHeader(h, params) {
        return (
          <Tooltip placement='top' transfer content={`${i18n.withdraw45}`}>
            { i18n.withdraw32}
            <Icon type='md-help' />
          </Tooltip>
        )
      },
      render(h, { row }) {
        return <span>{row.fail_amount}</span>
      }
    },
    {
      title: i18n.withdraw10,
      key: 'status_label',
      minWidth: 120,
      align: 'center',
    },
    {
      title: i18n.withdraw11,
      minWidth: 180,
      align: 'center',
      fixed: 'right',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={41}
              on-click={_ => Vue.handleView(row)}
            >
              {i18n.withdraw12}
            </Button>
            { /**第三方代付 */
              row.show_thirdpay_status==1?
              <Button
                style="margin-right:5px"
                type="primary"
                size="small"
                on-click={_ => Vue.handleEdit(row, 'pay')}
              >
              {i18n.withdraw34}
              </Button>
              :''
            }
            {
              /**驳回 */
             (row.status!=11 && row.status!=6 && row.amount==row.fail_amount)?
              <Poptip
              confirm
              title={i18n.withdraw44}
              placement="top-end"
              transfer={true}
              
              on-on-ok={_ => Vue.handleEdit(row, 'turndown')}
            >
              <Button
                style="margin-right:5px"
                type="primary"
                size="small"
                v-btn={68}
              >
              {i18n.withdraw43}
              </Button>
              </Poptip>
              :''
            /* <Button
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