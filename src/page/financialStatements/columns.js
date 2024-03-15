import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('financialStatements');
  return [
    {
        title: i18n.financialStatements0,
        key: 'merchant_id',
        align: 'center',
        minWidth: 100,
        render (h, { row }) {
            return (
                <span>{row.merchant?row.merchant.account:''}</span>
            )
        }
    },
    {
        title: i18n.financialStatements1,
        key: 'merchant_name',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.financialStatements2,
        key: 'payment_num',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.financialStatements3,
        key: 'payment_amount',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.financialStatements4,
        minWidth: 140,
        align: 'center',
        key: 'payment_point',
        render(h, { row }) {
            return (
                <span>{row.merchant.pay_behalf_point}</span>
            )
        }
    },
    {
        title: i18n.financialStatements5,
        key: 'recharge_num',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.financialStatements6,
        key: 'recharge_amount',
        minWidth: 140,
        align: 'center'
    },
    {
        title:  i18n.financialStatements7,
        key: 'recharge_point',
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
            return (
                <span>{row.merchant.collection_pay_point}</span>
            )
        }
    },
    {
        title: i18n.financialStatements8,
        key: 'total_amount',
        minWidth: 140,
        align: 'center'
    },
    {
        title: i18n.financialStatements11,
        key: '',
        minWidth: 240,
        align: 'center',
        render(h, { row }) {
            return (
                <div>
                    <Button  type="primary" size="small" v-btn={60} style="margin-right:5px" on-click={_ => Vue.handleDetail(row)}>
                    {i18n.financialStatements19}
                    </Button>
                </div>
                /*
                <div>
                    
                    <Button  type="success" size="small" style="margin-right:5px" on-click={_ => Vue.handleJump("recharge",row)}>
                    {i18n.financialStatements12}
                    </Button>
                    <Button  type="success" size="small" style="margin-right:5px" on-click={_ => Vue.handleJump("withdraw",row)}>
                    {i18n.financialStatements13}
                    </Button>
                    <Button  type="success" size="small" style="margin-right:5px" on-click={_ => Vue.handleJump("match",row)}>
                    {i18n.financialStatements14}
                    </Button>
                </div>
                */
            )
        }
    },
    
    
  ]
}