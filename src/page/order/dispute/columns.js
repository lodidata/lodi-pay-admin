import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('dispute');
  return [
    {
        title:i18n.dispute88,
        type: 'index',
        align: 'center',
        minWidth: 50,
    },
    /**主提款订单号 */
    {
        title: i18n.dispute1,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.order_collection && row.order_collection.order_pay ? row.order_collection.order_pay.inner_order_sn : ''}</span>
          )
        }
    },
    /**商户订单号 */
    {
        title: i18n.dispute2,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.order_collection &&row.order_collection.order_pay ? row.order_collection.order_pay.order_sn : ''}</span>
          )
        }
    },
    /**用户账户 */
    {
        title:i18n.dispute42,
      
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.order_collection && row.order_collection.order_pay ? row.order_collection.order_pay.user_account : ''}</span>
          )
        }
    },
    {
      title:i18n.dispute3,
      key: 'created_at',
      minWidth: 140,
      align: 'center'
    },
     /**所属厂商 */
    {
      title:i18n.dispute4,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection && row.order_collection.order_pay && row.order_collection.order_pay.merchant ? row.order_collection.order_pay.merchant.name : ''}</span>
        )
      }
    },
     /**提款方式 */
    {
      title:i18n.dispute5,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection && row.order_collection.order_pay ? row.order_collection.order_pay.payment : ''}</span>
        )
      }
    },
     /**提款账户 */
    {
      title:i18n.dispute6,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection && row.order_collection.order_pay ? row.order_collection.order_pay.user_account : ''}</span>
        )
      }
    },

    {
      title:i18n.dispute7,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection && row.order_collection.order_pay ? row.order_collection.order_pay.amount : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute8,
      
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.currency : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute43,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.amount : ''}</span>
        )
      }
    },
    /*
    {
      title:"是否匹配",
      key: '',
      minWidth: 140,
      align: 'center'
    },*/
    {
      title:i18n.dispute9,
    
      minWidth: 140,
      align: 'center',
       render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.inner_order_sn : ''}</span>
        )
      }
    },
   
    {
      title:i18n.dispute10,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection && row.order_collection.merchant? row.order_collection.merchant.name : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute11,
      key: 'payment',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.payment : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute12,
      key: 'user_account',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.user_account : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute13,
      key: 'amount',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.amount : ''}</span>
        )
      }
    },
    {
      title: i18n.dispute44,
      align: 'center',
      minWidth: 100,
      render (h, { row }) {
        return ( row.order_collection &&row.order_collection.attachment) ?
         <span on-click={_ => Vue.handleView(row.order_collection.attachment)} style="color: #2d8cf0;cursor: pointer;">{i18n.dispute44}</span> 
        : <span>{i18n.dispute45}</span>
      }
    },
    {
      title:i18n.dispute46,
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
    {//处理方案//1'待处理'2订单失败3订单完成
      title:i18n.dispute61,
      key: 'action_type',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return(
          <div>
            <span>
              {row.action_type==1?i18n.dispute77:row.action_type==2?i18n.dispute57:row.action_type==3?i18n.dispute54:''} 
            </span>
            <span>
               - 
              {row.problem_source==0?i18n.dispute77:row.problem_source==1?i18n.dispute70:row.problem_source==2?i18n.dispute71:row.problem_source==3?i18n.dispute72:i18n.dispute73}
            </span>
          </div>
          )
      }
    },
    /**事件描述 */
    {
      title:i18n.dispute63,
      key: '',
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return(row.description?h('Tooltip', {
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
          }, row.description && row.description.length ? row.description : ''),
          h('span', { 
              slot: 'content', 
              style: { 
                whiteSpace: 'normal', 
                wordBreak: 'break-all' 
              } 
            },row.description && row.description.length ? row.description : '')
        ]):''
        )
      }
    },
    {//'三方代付'//0失败 1成功
      title:i18n.dispute75,
      key: '',
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return(
          <span>
            {row.pay_status==0?i18n.dispute78:row.pay_status==1?i18n.dispute79:''} 
          </span> 
          )
      }
    },
    {
      title:i18n.dispute14,
      minWidth: 140,
      align: 'center',
      render (h, { row }) {
        return (
          <span>{row.order_collection ? row.order_collection.status_label : ''}</span>
        )
      }
    },
    {
      title:i18n.dispute40,
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
              v-btn={39}
              on-click={_ => Vue.handleEdit(row, 'detail')}
            >
            {i18n.dispute41}
            </Button>
            {
              /**处理按钮 */
              row.order_collection && (
                (row.order_collection.status==3 || row.order_collection.status==4|| row.order_collection.status==5) 
                && row.action_type ==1
                && row.problem_source==0
               )?
              <Button
                style="margin-right:5px"
                type="primary"
                size="small"
                v-btn={38}
                on-click={_ => Vue.handleEdit(row, 'handle')}
              >
              {i18n.dispute60}
              </Button>:''
            }
            {/** //三方代付 
                row.order_collection && (row.order_collection.status == 9 && row.order_collection.order_pay.status!=10  && (row.pay_status==null || row.pay_status==0))?
                  <Button
                  style="margin-right:5px"
                  type="primary"
                  size="small"
                  on-click={_ => Vue.handleEdit(row, 'pay')}
                >
                {i18n.dispute75}
                </Button>:''//'三方代付'
            }
            {
              //查看三方代付 
                row.order_collection && (row.order_collection.status == 9  && row.order_collection.order_pay.status!=10 && row.pay_status!=null && row.pay_status!=0)?
                  <Button
                  style="margin-right:5px"
                  type="primary"
                  size="small"
                  on-click={_ => Vue.handleEdit(row, 'showPay')}
                >
                {i18n.dispute80}
                </Button>:''
                */
            }
          </div>
        )
      },
    },

    
  ]
}