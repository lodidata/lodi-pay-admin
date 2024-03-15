import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('userDetail');
  return [
    {
      title: i18n.userDetail16,
      key: 'type',
      align: 'center'
    },
    {
      title: i18n.userDetail17,
      key: 'num',
      align: 'center',
      sortable: true
    },
    {
      title: i18n.userDetail18,
      key: 'total',
      align: 'center'
    },
    {
      title: i18n.userDetail19,
      key: 'oknum',
      align: 'center'
    },
    {
      title: i18n.userDetail20,
      key: 'oktotal',
      align: 'center'
    },
    {
      title: i18n.userDetail21,
      key: 'percent',
      align: 'center'
    },
    {
      title: i18n.userDetail22, //操作
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              size='small'
              type='primary'
           
              style='margin-right:5px'
              on-click={_ => Vue.handleJump(row)}
            >
            {i18n.userDetail23}
            </Button>
          </div>
        )
      }
    }
  ]
}
