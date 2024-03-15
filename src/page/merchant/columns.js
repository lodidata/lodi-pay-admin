import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('merchant')
  return [
    {
        title: i18n.merchant17,
        key: 'id',
        minWidth: 80,
        align: 'center'
    },
    {
        title: i18n.merchant18,
        key: 'name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.merchant63,
        key: 'account',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.merchant19,
        key: 'real_name',
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
          return h('Tooltip', {
            props: { placement: 'top-start',transfer:true },
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
            }, row.secrets.length ? row.secrets[0]['merchant_key'] : ''),
            h('span', { 
                slot: 'content', 
                style: { 
                  whiteSpace: 'normal', 
                  wordBreak: 'break-all' 
                } 
              }, row.secrets.length ? row.secrets[0]['merchant_key'] : '')
          ])
        }
    },
    {
        title: i18n.merchant20,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
            return (
                <div>
                    {!row.order_complete_method ? i18n.merchant10 : i18n.merchant11}
                </div>
            )
        }
    },
    {
        title: i18n.merchant4,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${row.is_pay_behalf == 0 ? i18n.merchant13 : i18n.merchant14} `}
                    on-on-ok={_ => Vue.handleStop(row, 'pay')}
                    >
                        <Button
                            type={row.is_pay_behalf === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px'
                            >
                            {row.is_pay_behalf === 0 ? i18n.merchant14 : i18n.merchant13}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    {
        title: i18n.merchant33,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <div>
              {
                row.pay_balance.length ? row.pay_balance[0].balance : ''
              }
            </div>
          )
        }
    },
    {
      title: i18n.merchant37,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            {
              row.collection_balance.length ? row.collection_balance[0].balance : ''
            }
          </div>
        )
      }
  },
    {
        title: i18n.merchant5,
        key: 'pay_behalf_level',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.merchant6,
        key: 'pay_behalf_point',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.merchant15,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${row.is_collection_behalf == 0 ? i18n.merchant13 : i18n.merchant14} `}
                    on-on-ok={_ => Vue.handleStop(row, 'collection')}
                    >
                        <Button
                            type={row.is_collection_behalf === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px'
                            >
                            {row.is_collection_behalf === 0 ? i18n.merchant14 : i18n.merchant13}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    {
        title: i18n.merchant7,
        key: 'collection_pay_level',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.merchant8,
        key: 'collection_pay_point',
        minWidth: 140,
        align: 'center'
    },
    {
      title: i18n.merchant46,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial?row.financial.payment_total:''}</span>
        )
      }
    },
    {
      title: i18n.merchant47,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial?row.financial.payment_amount:''}</span>
        )
      }
    },
    /**代付成功率 */
    {
      title: i18n.merchant48,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial && row.financial.payment_num!='0'  ?  ( row.financial.payment_num / row.financial.payment_total * 100).toFixed(2)+"%" :'0%'}</span>
        )
      }
    },
    {
      title: i18n.merchant49,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial&& row.financial.trial_pay_num!='0' ? (row.financial.trial_pay_num / row.financial.payment_total  * 100).toFixed(2)+"%" :'0%'}</span>
        )
      }
    },
    {
      title: i18n.merchant50,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial?row.financial.recharge_total:''}</span>
        )
      }
    },
    {
      title: i18n.merchant51,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial?row.financial.recharge_amount:''}</span>
        )
      }
    },
    {
      title: i18n.merchant52,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial && row.financial.recharge_num!='0' ?(row.financial.recharge_num / row.financial.recharge_total  * 100).toFixed(2)+"%" :'0%'}</span>
        )
      }
    },
    {
      title: i18n.merchant53,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.financial && row.financial.trial_collection_num!='0' ?(row.financial.trial_collection_num / row.financial.recharge_total  * 100).toFixed(2)+"%" :'0%'}</span>
        )
      }
    },
    {
      title: i18n.merchant27,
      key: 'created_at',
      minWidth: 140,
      align: 'center'
    },
   
    {
      title: i18n.merchant21,
      minWidth: 250,
      fixed: 'right',
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={7}
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              {i18n.merchant2}
            </Button>
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
              改密
            </Button>
            */
            }
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handlePay(row)}
            >
              {i18n.merchant32}
            </Button>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={47}
              on-click={_ => Vue.handleSet(row)}
            >
              {i18n.merchant43}
            </Button>
            
            <Poptip
              confirm
              placement="top-end"
              transfer="true"
              v-btn={8}
              title={i18n.merchant61}
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' size="small">
                {i18n.merchant62}
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