import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('threePay');
  return [
    /**订单号 */
    {
      title: i18n.threePay15,
      key: 'inner_order_sn',
      align: 'center'
    },
    /**提款订单号 */
    {
      title: i18n.threePay16,
      key: 'pay_inner_order_sn',
      align: 'center',
      sortable: true
    },
     /**第三方代付 */
    {
      title:i18n.threePay17,
      key: '',
      align: 'center',
      render(h, { row }) {
        return (
          <span>{row.pay_config?row.pay_config.name:''}</span>
        )
      }
    },
    /**发起转账时间 */
    {
      title: i18n.threePay18,
      key: 'created_at',
      align: 'center'
    },
      /**收款人 */
    {
      title: i18n.threePay19,
      key: 'bank_card_account',
      align: 'center'
    },
    /**收款银行*/
    {
      title: i18n.threePay20,
      key: 'bank',
      align: 'center'
    },
    /*
    {
      title: "所属支行",
      key: '',
      align: 'center'
    },
    {
      title: "地区",
      key: '',
      align: 'center'
    },*/
    /**银行账号 */
    {
      title: i18n.threePay21,
      key: 'bank_card_account',
      align: 'center'
    },
    /**转账金额 */
    {
      title: i18n.threePay22,
      key: 'amount',
      align: 'center'
    },
     /**实际到账金额 
    {
      title:i18n.threePay23,
      key: 'received_amount',
      align: 'center'
    },*/
     /**状态 */
    {
      title: i18n.threePay24,
      key: 'status',
      align: 'center',
      render(h, { row }) {
        return (
          
          <Button
              type={row.status === 1 ? 'warning':row.status === 2 ? 'success' : 'error'}
              size='small'
              style='margin-right:5px'
              >{row.status==1?i18n.threePay12:row.status==2?i18n.threePay13:i18n.threePay14}</Button>
        )
      }
    },
    /**备注 */
    {
      title: i18n.threePay25,
      key: 'remark',
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
    /**操作 */
    {
      title: i18n.threePay26,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {
              row.status==1 ?
              <Button size='small'
               type='error' 
               on-click={_ => Vue.handleOpenModal('fail',row)}  
              >
                { i18n.threePay9}
              </Button>
              :''
            }
          </div>
        )
      }
    }
  ]
  /** 
   * <Poptip confirm title={`${i18n.systemRole7} ${row.role_name} ?`} on-on-ok={_ => Vue.handleDetele(row)}>
      <Button size='small' type='error'   v-auth={14}>
      {i18n.systemRole6}
      </Button>
    </Poptip> 
  */
}
