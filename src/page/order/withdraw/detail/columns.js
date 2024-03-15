import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('withdrawDetail');
  return [
    {
        title: 'ID',
        type: 'index',
        align: 'center',
        minWidth: 50
    },
    {
        title: i18n.withdrawDetail0,
        key: 'inner_order_sn',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdrawDetail1,
        key: 'order_sn',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdrawDetail2,
        key: 'created_at',
        minWidth: 140,
        align: 'center',
    },
    {
        title: i18n.withdrawDetail3,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
            return (
                <span>{row.merchant ? row.merchant.name : ''}</span>
            )
        }
    },
    {
        title: i18n.withdrawDetail4,
        key: 'payment',
        minWidth: 80,
        align: 'center',
    },
    {
        title: i18n.withdrawDetail5,
        key: 'user_account',
        minWidth: 90,
        align: 'center',
    },
    {
      title: i18n.withdrawDetail6,
      key: 'amount',
      minWidth: 80,
      align: 'center',
    },
    {
      title: i18n.withdrawDetail7,
      key: 'match_amount',
      minWidth: 80,
      align: 'center',
    },
    {
      title: i18n.withdrawDetail8,
      key: 'status_label',
      minWidth: 100,
      align: 'center'
    },
    {
      title:i18n.withdrawDetail26,
      minWidth:100,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
             <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'match')}
            >
              {i18n.withdrawDetail30}
            </Button>
          </div>
        )
      }
    }
    // {
    //   title: '操作',
    //   minWidth: 100,
    //   align: 'center',
    //   render (h, { row }) {
    //     return (
    //       <div>
    //         <Button
    //           style="margin-right:5px"
    //           type="primary"
    //           size="small"
    //           on-click={_ => Vue.handleEdit(row, 'edit')}
    //         >
    //           编辑
    //         </Button>
    //         <Button
    //           style="margin-right:5px"
    //           type="primary"
    //           size="small"
    //           on-click={_ =>  Vue.handleEdit(row, 'password')}
    //         >
    //           改密
    //         </Button>
    //         <Poptip
    //           confirm
    //           title="确认删除 ?"
    //           on-on-ok={_ => Vue.handleDelete(row)}
    //         >
    //           <Button type='error' size="small">
    //             删除
    //           </Button>
    //         </Poptip>
    //       </div>
    //     )
    //   },
    //   myExt: {
    //     label: 'handle',
    //     require: true
    //   }
    // }
  ]
}