import { Button, Poptip, Tag } from 'iview'
export default function (Vue) {
  return [
    // {
    //   title: '账号ID',
    //   key: 'name',
    //   align: 'center'
    // },
    {
      title: 'ID',
      key: 'id',
      align: 'center'
    },
    {
      title: '名称',
      key: 'menu_name',
      align: 'center'
    },
    {
      title: '厂商',
      key: 'menu_type',
      align: 'center'
    },
    {
      title: '货币',
      width: '300',
      key: 'currency',
      align: 'center'
    },

    {
      title: '状态',
      minWidth: 50,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
          { <Poptip
            confirm
            title={`确认${row.status == 0 ? '已上架' : '已下架'}该游戏类型吗`}
            on-on-ok={_ => Vue.handleStop(row)}
          >
            
            <Button
              type={row.status === 0 ? 'error' : 'success'}
              size='small'
         
              style='margin-right:5px'
            >
              {row.status === 0 ? '已下架' : '已上架'}
            </Button>
          </Poptip>}
        </div>
        )
      }
    },
    {
      title: '上架时间',
      key: 'created_at',
      minWidth: 140,

      align: 'center'
    },
    {
      title: '维护时间',
      key: 'end_uworked_at',
      render(h, { row }) {
        return (
          <div>{row.start_uworked_at} - {row.end_uworked_at}</div>
        )
      },
      minWidth: 140,
      align: 'center'
    },
    {
      title: '操作',
      minWidth: 100,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {/* <Button
              style="margin-right:5px"
              type="primary"
              size="small"
              on-click={_ => Vue.handleEdit(row, 'edit')}
            >
              编辑
            </Button> */}

            <Button  type="success" size="small" on-click={_ => Vue.handleSwitch(row)}>
              维护
            </Button>


            <Button v-auth={59} style="margin-left:5px" size="small" type="primary" on-click={_ => Vue.onGameManage(row)}>
              游戏管理
            </Button>
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
