import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('recharge');
  return [
    {
        title: i18n.recharge0,
        type: 'index',
        minWidth: 50,
        align: 'center'
    },
    /**充值订单号 */
    {
        title: i18n.recharge1,
        key: 'inner_order_sn',
        minWidth: 140,
        align: 'center'
    },
    /**商户订单号 */
    {
        title: i18n.recharge2,
        key: 'order_sn',
        minWidth: 140,
        align: 'center'
    },
    /**订单时间 */
    {
        title: i18n.recharge3,
        key: 'created_at',
        minWidth: 100,
        align: 'center'
    },
    /**所属商户 */
    {
        title: i18n.recharge4,
        key: 'site_url',
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.merchant?row.merchant.name:''}</span>
          )
        }
    },
    /**充值方式 */
    {
        title: i18n.recharge5,
        key: 'payment',
        minWidth: 50,
        align: 'center'
    },
    /**充值账户 */
    {
        title: i18n.recharge6,
        key: 'user_account',
        minWidth: 80,
        align: 'center'
    },
    /**充值金额 */
    {
        title: i18n.recharge7,
        key: 'amount',
        minWidth: 50,
        align: 'center'
    },
    /**币种 */
    {
        title: i18n.recharge8,
        key: 'currency',
        minWidth: 50,
        align: 'center'
    },
    /**是否匹配 */
    {
        title: i18n.recharge9,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.order_pay ? i18n.recharge10 : i18n.recharge11}</span>
          )
        }
    },
    /**查看凭证 */
    {
      title: i18n.recharge44,
      key: '',
      minWidth: 100,
      align: 'center',
      render (h, { row }) {
        return ( row.attachment) ?
         <span on-click={_ => Vue.handleView(row.attachment)} style="color: #2d8cf0;cursor: pointer;">{'查看凭证'}</span> 
        : <span>{i18n.recharge45}</span>
      }
  },
    /**备注 */
    {
      title:i18n.recharge46,
      key: 'remark',
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return(row.remark? h(
          'Tooltip', {
            props: { placement: 'top' },
          }, [
          h('div', {
            style: {
                width: '140px',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                overflow: 'hidden',
                display: '-webkit-box',
                webkitBoxOrient:'vertical',
                webkitLineClamp: 2
            }
          }, row.remark && row.remark.length ? row.remark : ''),
          h('span', { 
              slot: 'content', 
              style: { 
                whiteSpace: 'normal', 
                wordBreak: 'break-all' 
              } 
            },row.remark && row.remark.length ? row.remark : '')
        ]
        ):'')
      }
    },
    /**订单状态 */
    {
        title: i18n.recharge12,
        key: 'status_label',
        minWidth: 100,
        align: 'center'
    },
    {/**操作 */
      title: i18n.recharge39,
      minWidth: 200,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
             <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'detail')}
            >
              {i18n.recharge40}
            </Button>
            { /**上传凭证 */
              /*(row.order_type==1 && (row.status==2 || row.status==3))?*/
              row.status==3?
              <Button
                style="margin-right:5px"
                type="primary"
                size="small"
                v-btn={70}
                on-click={_ => Vue.handleEdit(row, 'upload')}
              >
              {i18n.recharge41}
              </Button>
              :''
            }
            {/**标记争议 */
              row.show_status==1 ?
              <Poptip
                confirm
                title={i18n.recharge39} 
                on-on-ok={_ => Vue.handleDispute(row)}
              >
              {
                !row.is_controversial ? <Button type='error' size="small" v-btn={69}>
                  {i18n.recharge42}
                  </Button> : ''
                }
              </Poptip>
              :''
            }
            {
              /**查看争议 */
               row.show_status==2?
              <Button
                style="margin-right:5px"
                type="primary"
                size="small"
                v-btn={69}
                on-click={_ => Vue.handleEdit(row, 'showDispute')}
              >
              {i18n.recharge43}
              </Button>
              :""
            }
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