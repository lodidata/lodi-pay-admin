import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('threePay');
  return [
    {
      title: i18n.threePay27,
      key: 'name',
      align: 'center'
    },
    {
      title: i18n.threePay37,
      align: 'center', //merchant
      sortable: true,
      render(h, { row }) {
        return (
          <span>{row.merchant?row.merchant.name:''}</span>
        )
      }
    },
    /**商户账号 */
    {
      title: i18n.threePay28,
      key: 'merchant_account',
      align: 'center',
      sortable: true
    },
    {
      title:i18n.threePay29,
      key: 'sort',
      align: 'center',
    },
    {
      title: i18n.threePay24,
      key: 'status',
      align: 'center',
      render(h, { row }) {
        return (
          <Button
            type={row.status=="enabled" ? 'success' : 'error'}
            size='small'
            style='margin-right:5px'
            >{row.status=="enabled"?i18n.threePay30:i18n.threePay31}</Button>
        )
      }
    },
    {
      title: i18n.threePay26,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              size='small'
              type='primary'
              v-btn={51}
              style='margin-right:5px'
              on-click={_ => Vue.threepayEdit('edit',row)}
            >
            {i18n.threePay32}
            </Button>
            <Poptip confirm title={`${i18n.threePay45} ${row.name} ?`} on-on-ok={_ => Vue.handleDetele(row)}>
              <Button size='small' type='error' v-btn={52} >
              {i18n.threePay46}
              </Button>
            </Poptip> 
          </div>
        )
      }
    }
  ]
}
