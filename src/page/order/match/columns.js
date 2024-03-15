import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('match');
  return [
    {
        title:i18n.match0,
        type: 'index',
        align: 'center',
        minWidth: 50,
    },
    /*
    {
        title: i18n.match1,
        key: 'orders_collection_sn',
        minWidth: 140,
        align: 'center'
    },*/
    {
        title: i18n.match2,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.order_pay ? row.order_pay.inner_order_sn : ''}</span>
          )
        }
    },
    {
        title: i18n.match3,
        minWidth: 140,
        align: 'center',
        key: '',
        
        render (h, { row }) {
          return (
            <span>{row.order_pay ? row.order_pay.order_sn : ''}</span>
          )
        }
    },
    {
        title:i18n.match34,
        key: 'user_account',
        minWidth: 140,
        align: 'center'
    },
    {
      title:i18n.match4,
      key: 'created_at',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match5,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_pay && row.order_pay.merchant ? row.order_pay.merchant.name : ''}</span>
        )
      }
    },
    {
      title:i18n.match6,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_pay ? row.order_pay.payment : ''}</span>
        )
      }
    },
    {
      title:i18n.match7,
     
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_pay ? row.order_pay.user_account : ''}</span>
        )
      }
    },
    {
      title:i18n.match8,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_pay ? row.order_pay.amount : ''}</span>
        )
      }
    },
    {
      title:i18n.match9,
      key: 'currency',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match35,
      key: 'amount',
      minWidth: 140,
      align: 'center'
    },
    /*
    {
      title:"是否匹配",
      key: '',
      minWidth: 140,
      align: 'center'
    },*/

    {
      title:i18n.match10,
      key: 'inner_order_sn',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match11,
     
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.merchant?row.merchant.name:''}</span>
        )
      }
    },
    {
      title:i18n.match12,
      key: 'payment',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match13,
      key: 'user_account',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match14,
      key: 'amount',
      minWidth: 140,
      align: 'center'
    },
    {
      title: i18n.match15,
      align: 'center',
      minWidth: 100,
      render (h, { row }) {
        return ( row.attachment) ?
         <span on-click={_ => Vue.handleView(row.attachment)} style="color: #2d8cf0;cursor: pointer;">{i18n.match15}</span> 
        : <span>{i18n.match17}</span>
      }
    },
    {
      title:i18n.match36,
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
    {
      title:i18n.match16,
      key: 'status_label',
      minWidth: 140,
      align: 'center'
    },
    {
      title:i18n.match32,
      minWidth: 140,
      fixed: 'right',
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              v-btn={37}
              on-click={_ => Vue.handleEdit(row, 'detail')}
            >
              {i18n.match33}
            </Button>
            
          </div>
        )
      },
    },

    
  ]
}