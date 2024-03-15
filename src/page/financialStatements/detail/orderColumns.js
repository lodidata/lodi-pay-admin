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
    /**商户订单号 */
    {
        title:i18n.financialStatementsDetail4,
        key:'order_sn',
        minWidth: 140,
        align: 'center',
    },
    /**用户账号 */
    {
        title: i18n.financialStatementsDetail5,
        key:'p_user_account',
        minWidth: 140,
        align: 'center',
       
    },
    /**匹配订单时间 */
    {
        title: i18n.financialStatementsDetail6,
        key:'created_at',
        minWidth: 140,
        align: 'center',
       
    },
    /**所属商户 */
    {
        title: i18n.financialStatementsDetail7,
        key:'p_merchant_id_name',
        minWidth: 140,
        align: 'center',
       
    },
    /**提款方式 */
    {
        title: i18n.financialStatementsDetail8,
        key:'p_payment',
        minWidth: 140,
        align: 'center',
       
    },
    /**提款账户 */
    {
        title: i18n.financialStatementsDetail9,
        key:'p_user_account',
        minWidth: 140,
        align: 'center',
       
    },
    /**提款金额 */
    {
        title: i18n.financialStatementsDetail10,
        key:'p_amount',
        minWidth: 140,
        align: 'center',
       
    },
    /**币种 */
    {
        title: i18n.financialStatementsDetail11,
        key:'p_currency',
        minWidth: 140,
        align: 'center',
       
    },
    /**匹配订单金额 */
    {
        title: i18n.financialStatementsDetail12,
        key:'c_amount',
        minWidth: 140,
        align: 'center',
       
    },
    /**充值订单号 */
    {
        title: i18n.financialStatementsDetail13,
        key:'inner_order_sn',
        minWidth: 140,
        align: 'center',
       
    },
    /**充值订单商户 */
    {
        title: i18n.financialStatementsDetail14,
        key:'c_merchant_id_name',
        minWidth: 140,
        align: 'center',
       
    },
    /**充值方式 */
    {
        title: i18n.financialStatementsDetail15,
        key:'c_payment',
        minWidth: 140,
        align: 'center',
       
    },
    /**充值账号 */
    {
        title:i18n.financialStatementsDetail16,
        key:'c_user_account',
        minWidth: 140,
        align: 'center',
       
    },
    /**充值金额 */
    {
        title: i18n.financialStatementsDetail17,
        key:'c_amount',
        minWidth: 140,
        align: 'center',
       
    },
     /**查看凭证 */
    {
        title: i18n.financialStatementsDetail18,
        key:'',
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
            return ( row.collection_url.length>0) ?
             <span on-click={_ => Vue.handleView(row.collection_url)} style="color: #2d8cf0;cursor: pointer;">{i18n.financialStatementsDetail18}</span> 
            : <span>{''}</span>
          }
    },
    /**备注 */
    {
        title: i18n.financialStatementsDetail19,
        key:'c_remark',
        minWidth: 140,
        align: 'center',
    },/**"订单状态" */
    {
        title: i18n.financialStatementsDetail20,
        key:'status',
        minWidth: 140,
        align: 'center',
    },
  ]
}