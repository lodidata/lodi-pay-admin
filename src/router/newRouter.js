import Main from '@/components/Main'
import that from '@/main.js'
import i18n from '../i18n/index'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  hideInBread: (false) 设为true后在面包屑不显示
 *  cache: (false) 设为true后页面会缓存，默认不缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

let i18n_lang = i18n.messages[i18n.locale].router

export default [
  // 账号与权限
  // 渠道管理
  // {
  //   path: '/auth',
  //   name: 'auth',
  //   meta: {
  //     icon: 'md-cloud-download',
  //     title: '账号与权限',
  //     id: 495
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'organization',
  //       name: 'organization',
  //       meta: {
  //         title: '组织管理',//组织管理
  //         id: 496
  //       },
  //       component: () => import('@/page/auth/organization')
  //     },
  //     {
  //       path: 'team',
  //       name: 'team',
  //       meta: {
  //         title: '团队管理',//`团队管理`
  //         id: 503
  //       },
  //       component: () => import('@/page/auth/team')
  //     },
  //     {
  //       path: 'roleManage',
  //       name: 'roleManage',
  //       meta: {
  //         title: '角色权限',//`角色权限`
  //         id: 511
  //       },
  //       component: () => import('@/page/auth/roleManage')
  //     },
  //     {
  //       path: 'addRole',
  //       name: 'addRole',
  //       meta: {
  //         hideInMenu: true,
  //         title: '新增角色权限',//`角色权限`
  //         id: 511
  //       },
  //       component: () => import('@/page/auth/roleManage/addRole')
  //     },
  //     {
  //       path: 'account',
  //       name: 'account',
  //       meta: {
  //         title: '账号管理',//`账号管理`
  //         id: 517
  //       },
  //       component: () => import('@/page/auth/account')
  //     },
  //     {
  //       path: 'addAccount',
  //       name: 'addAccount',
  //       meta: {
  //         hideInMenu: true,
  //         title: '新增账号',//`账号管理`
  //         id: 517
  //       },
  //       component: () => import('@/page/auth/account/add')
  //     },
  //     {
  //       path: 'detailAccount',
  //       name: 'detailAccount',
  //       meta: {
  //         hideInMenu: true,
  //         title: '账号详情',//`账号管理`
  //         id: 517
  //       },
  //       component: () => import('@/page/auth/account/detail')
  //     },
  //   ]
  // },
  // 商户管理
  {
    path: '/',
    name: 'merchant',
    meta: {
      icon: 'md-contacts',
      title: i18n_lang.router109,
      id: 1
    },
    component: Main,
    children: [
      {
        path: 'merchant',
        name: '_merchant',
        meta: {
          title: i18n_lang.router109,
          icon: 'md-contacts',
          id: 1
        },
        component: () => import('@/page/merchant')
      },
    ]
  },
  // 用户管理
  {
    path: '/',
    name: 'user',
    meta: {
      icon: 'md-person',
      title: i18n_lang.router119,
      id: 3
    },
    component: Main,
    children: [
      // 用户列表
      {
        path: 'userList',
        name: 'userList',
        meta: {
          title: i18n_lang.router120,
          id: 9
        },
        component: () => import('@/page/user/userList')
      },
      {
        path: 'userList/detail',
        name: 'userListdetail',
        meta: {
          title: i18n_lang.router124,
          id: 9,
          hideInMenu: true
        },
        component: () => import('@/page/user/userList/detail')
      },
      // 标签管理
      {
        path: 'label',
        name: 'label',
        meta: {
          title: i18n_lang.router121,
          id: 10
        },
        component: () => import('@/page/user/label')
      },
    ]
  },
  // 代理
  // {
  //   path: '/',
  //   name: 'agent',
  //   meta: {
  //     icon: 'md-list-box',
  //     title: '代理管理',
  //     id: 1
  //   },
  //   component: Main,
  //   children: [
  //     // 代理列表
  //     {
  //       path: 'agent',
  //       name: 'agentList',
  //       meta: {
  //         title: '代理列表',
  //         id: 2
  //       },
  //       component: () => import('@/page/agent')
  //     },
  //     {
  //       path: 'agent/ip',
  //       name: 'ip',
  //       meta: {
  //         title: 'ip加白',
  //         id: 2,
  //         hideInMenu: true
  //       },
  //       component: () => import('@/page/agent/ip')
  //     },
  //     {
  //       path: 'agent/game',
  //       name: 'game',
  //       meta: {
  //         title: '代理游戏',
  //         id: 2,
  //         hideInMenu: true
  //       },
  //       component: () => import('@/page/agent/game')
  //     },
  //   ]
  // },
  // 游戏管理
//  {
//   path: '/game',
//   name: 'game',
//   meta: {
//     icon: 'md-game-controller-b',
//     title: '游戏管理',
//     id: 1
//   },
//   component: Main,
//   children: [
   
//     {
//       path: 'gameAllList',
//       name: 'gameAllList',
//       meta: {
//         title: '游戏列表',
//         id: 2
//       },
//       component: () => import('@/page/gameAllList')
//     },
  
//     {
//       path: 'gameManages',
//       name: 'gameManages',
//       meta: {
//         title: '游戏厂商管理',
//         id: 2
//       },
//       component: () => import('@/page/gameManage')
//     },
//     {
//       path: 'gameType',
//       name: 'gameType',
//       meta: {
//         title: '游戏类型管理',
//         id: 2
//       },
//       component: () => import('@/page/gameTypeManage')
//     },
//     {
//       path: 'currencyManage',
//       name: 'currencyManage',
//       meta: {
//         title: '货币管理',
//         id: 2
//       },
//       component: () => import('@/page/currencyManage')
//     },
//   ]
// },
  

  // 订单管理
  {
    path: '/',
    name: 'order',
    meta: {
      icon: '_bingtu',
      title: i18n_lang.router113,
      id: 4
    },
    component: Main,
    children: [
      // 提款
      {
        path: 'withdraw',
        name: 'withdraw',
        meta: {
          title: i18n_lang.router114,
          id: 32,
         //cache: true,
        },
        component: () => import('@/page/order/withdraw')
      },
      {
        path: 'withdraw/detail',
        name: 'withdrawDetail',
        meta: {
          title: i18n_lang.router115,
          id: 32,
          hideInMenu: true
        },
        component: () => import('@/page/order/withdraw/detail')
      },
      // 充值
      {
        path: 'recharge',
        name: 'recharge',
        meta: {
          title: i18n_lang.router116,
          //cache: true,
          id: 33
        },
        component: () => import('@/page/order/recharge')
      },
      // 匹配
      {
        path: 'match',
        name: 'match',
        meta: {
          title: i18n_lang.router117,
         //cache: true,
          id: 34
        },
        component: () => import('@/page/order/match')
      },
      {
        path: 'match/detail',
        name: 'matchDetail',
        meta: {
          title: i18n_lang.router122,
          id: 34,
          hideInMenu: true
        },
        component: () => import('@/page/order/match/detail')
      },
      // 争议
      {
        path: 'dispute',
        name: 'dispute',
        meta: {
          title: i18n_lang.router118,
         // cache: true,
          id: 35
        },
        component: () => import('@/page/order/dispute')
      },
      {
        path: 'dispute/detail',
        name: 'disputedetail',
        meta: {
          title: i18n_lang.router123,
          id: 35,
          hideInMenu: true
        },
        component: () => import('@/page/order/dispute/detail')
      },
    ]
  },
  //财务报表
  {
    path: '/',
    name: 'financialStatements',
    meta: {
      icon: 'md-trophy',
      title: i18n_lang.router125,
      id: 2
    },
    component: Main,
    children: [
      {
        path: 'financialStatements',
        name: '_financialStatements',
        meta: {
          title: i18n_lang.router125,
          icon: 'md-trophy',
          id: 3
        },
        component: () => import('@/page/financialStatements')
      },
      {
        path: 'financialStatements/detail',
        name: 'financialStatementsDetail',
        meta: {
          title: i18n_lang.router128,
          id: 2,
          hideInMenu: true
        },
        component: () => import('@/page/financialStatements/detail')
      },
    ]
  },
   //第三方代付
   {
    path: '/',
    name: 'threePay',
    meta: {
      icon: '',
      title: i18n_lang.router127,
      id: 49
    },
    component: Main,
    children: [
      {
        path: 'threePay',
        name: '_threepay',
        meta: {
          title: i18n_lang.router127,
          icon: '_yingxiao',
          id: 49
        },
        component: () => import('@/page/threepay')
      },
    ]
  },
  // 系统管理
  {
    path: '/',
    name: 'system',
    meta: {
      icon: 'md-cog',
      title: i18n_lang.router50,
      id: 5
    },
    component: Main,
    children: [
      // 系统配置
      {
        path: 'setting',
        name: 'setting',
        meta: {
          title: i18n_lang.router110,
          id: 18
        },
        component: () => import('@/page/setting')
      },
      // 账号列表
      {
        path: 'account',
        name: 'account',
        meta: {
          title: i18n_lang.router111,
          id: 19
        },
        component: () => import('@/page/account')
      },
      // 权限管理
      {
        path: 'role',
        name: 'role',
        meta: {
          title: i18n_lang.router112,
          id: 20
        },
        component: () => import('@/page/role')
      },
      {
        path: 'adminLog',
        name: 'adminLog',
        meta: {
          title: i18n_lang.router126,
          id: 48
        },
        component: () => import('@/page/adminLog')
      },
    ]
  },
 

  
]
