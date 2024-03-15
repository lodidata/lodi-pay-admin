import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('withdrawDetail');
  return [
    {
        title: 'ID',
        type: 'index',
        minWidth: 50,
        align: 'center'
    },
    {
        title: i18n.withdrawDetail12,
        key: 'pay_inner_order_sn',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdrawDetail13,
        key: 'order_sn',
        minWidth: 140,
        align: 'center',
    },
    {
        title: i18n.withdrawDetail14,
        key: 'created_at',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.withdrawDetail15,
        key: 'merchant_account',
        minWidth: 80,
        align: 'center',
        
    },
    {
        title: i18n.withdrawDetail16,
        key: 'payment',
        minWidth: 90,
        align: 'center',
    },
    {
      title: i18n.withdrawDetail17,
      key: 'user_accounts',
      minWidth: 80,
      align: 'center',
    },
    {
      title: i18n.withdrawDetail18,
      key: 'amount',
      minWidth: 80,
      align: 'center',
    },
    {
      title: i18n.withdrawDetail19,
      key: 'currency',
      minWidth: 80,
      align: 'center',
    },
    {
      title: i18n.withdrawDetail20,
      align: 'center',
      key: 'inner_order_sn',
      minWidth: 140,
    
    },
    {
      title: i18n.withdrawDetail21,
      align: 'center',
      minWidth: 80,

      render (h, { row }) {
        return (
            <span>{row.merchant ? row.merchant.name : ''}</span>
        )
    }
    
    },
    {
      title: i18n.withdrawDetail22,
      align: 'center',
      minWidth: 80,
      key: 'payment',
     
    },
    {
      title: i18n.withdrawDetail23,
      align: 'center',
      key: "user_account",
      minWidth: 80,
     
    },
    {
      title: i18n.withdrawDetail24,
      align: 'center',
      key: "amount",
      minWidth: 80,
      
    },
    {
      title: i18n.withdrawDetail25,
      key: 'status_label',
      minWidth: 80,
      align: 'center'
    },

    {
      title: i18n.withdrawDetail26,
      minWidth: 150,
      align: 'center',
      render (h, { row }) {
        return (
          <div>
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
              改密
            </Button> */}
             <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'detail')}
            >
              {i18n.withdrawDetail29}
             
            </Button>
            {
                  row.show_status==1?
                  <Poptip
                    confirm
                    title={i18n.withdrawDetail26} 
                    on-on-ok={_ => Vue.handleDispute(row)}
                  >
                    {
                      !row.is_controversial ? <Button type='error' size="small" v-btn={44}>
                        {i18n.withdrawDetail28}
                      </Button> : ''
                    }
                  </Poptip>

                  :''
            }
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