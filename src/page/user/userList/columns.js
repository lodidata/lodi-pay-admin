import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  const i18n = Vue.$t('userList');
  return [
    {
        title: i18n.userList0,
        key: 'user_account',
        minWidth: 80,
        align: 'center'
    },
    {
        title: i18n.userList1,
        minWidth: 140,
        align: 'center',
        render (h, { row }) {
          return (
            <span>{row.merchant ? row.merchant.name : ''}</span>
          )
        }
    },
   
    {
        title: i18n.userList2,
        minWidth: 50,
        align: 'center',
        render (h, { row }) {
            return (
            <div>
                {
                    <Poptip
                    confirm
                    title={`${i18n.userList5}${row.status == 0 ? i18n.userList6 : i18n.userList7} `}
                    on-on-ok={_ => Vue.handleStop(row)}
                    >
                        <Button
                            type={row.status === 0 ? 'error' : 'success'}
                            size='small'
                            style='margin-right:5px' 
                            >
                            {row.status === 0 ?  i18n.userList7  :i18n.userList6}
                        </Button>
                    </Poptip>
                }
            </div>
            )
        }
    },
    /*
    {
        title: "充值笔数",
        key:"",
        minWidth: 140,
        align: 'center'
        
    },
    {
      title: "充值成功笔数",
      key:"",
      minWidth: 140,
      align: 'center'
      
   },
   {
      title: "充值成功金额",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },
    {
      title: "平均充值金额",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },
    {
      title: "提款笔数",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },
    {
      title: "提款成功笔数",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },
    {
      title: "提款成功金额",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },
    {
      title: "平均提款金额",
      key:"",
      minWidth: 140,
      align: 'center'
    
    },*/
    {
        title: i18n.userList3,
        minWidth: 140,
        align: 'center',
        render (h, { row: {tags} }) {
          return (
            <div>
              {
                tags.map(item => <Tag>{item.name}</Tag>)
              }
            </div>
          )
        }
    },
    {
      title: i18n.userList4,
      minWidth: 100,
      align: 'center',
      render (h, { row}) {
        return (
          <div>
            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'add')}
            >
              {i18n.userList9}
            </Button>

            <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'detail')}
            >
              {i18n.userList22}
            </Button>
            
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ =>  Vue.handleEdit(row, 'password')}
            >
              改密
            </Button> */}
            {/* <Poptip
              confirm
              title="确认加入黑名单 ?"
              on-on-ok={_ => Vue.handleBlack(row)}
            >
              <Button type='error' size="small">
                加入黑名单
              </Button>
            </Poptip> */}
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