import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('financialStatementsDetail');
  return [
    {
        title: 'ID',
        type: 'index',
        align: 'center',
        minWidth: 50
    },
    /**主提款订单号 */
    {
        title: i18n.financialStatementsDetail3,
        key:'pay_inner_order_sn',
        minWidth: 140,
        align: 'center',
    },
    /**代付订单号 */
    {
        title: i18n.financialStatementsDetail21,
        key:'order_sn',
        minWidth: 140,
        align: 'center',
    },
    /**商户订单号 */
    {
        title: i18n.financialStatementsDetail4,
        key:'',
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
            return (
             <span>{row.order_pay?row.order_pay.order_sn:''}</span>
            )
        }
    },
    /** 代付时间*/
    {
        title: i18n.financialStatementsDetail22,
        key:'created_at',
        minWidth: 140,
        align: 'center',
    },
    /**所属商户 */
    {
        title: i18n.financialStatementsDetail7,
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
            return (
             <span>{row.merchant?row.merchant.name:''}</span>
            )
        }
    },
    /**交易类型 */
    {
        title: i18n.financialStatementsDetail23,
        key:'config_name',
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
            return (
             <span>{row.pay_config?row.pay_config.type:''}</span>
            )
        }
    },
    /**交易类别 */
    {
        title: i18n.financialStatementsDetail24,
        key:'',
        minWidth: 140,
        align: 'center',
       
    },
    /**交易金额 */
    {
        title: i18n.financialStatementsDetail25,
        key:'amount',
        minWidth: 140,
        align: 'center',
    },
    /**备注 */
    {
        title: i18n.financialStatementsDetail19,
        key:'remark',
        minWidth: 140,
        align: 'center',
    },
    /**状态 */
    {
        title: i18n.financialStatementsDetail26,
        key:'status_label',
        minWidth: 140,
        align: 'center',
    }
  ]
}