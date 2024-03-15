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
    {
        title: i18n.financialStatementsDetail0,
        key:'config_name',
        minWidth: 140,
        align: 'center',
    },
    {
        title: i18n.financialStatementsDetail1,
        key: 'total_num',
        minWidth: 140,
        align: 'center',
        render(h, { row }) {
          return (
            <span style='color:blue' on-click={_ => Vue.handleDetail(row)}>{row.total_num}</span>
          )
        }
    },
    {
        title: i18n.financialStatementsDetail2,
        key: 'total_amount',
        minWidth: 140,
        align: 'center',
    },
  ]
}