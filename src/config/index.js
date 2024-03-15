const plugin =
  process.env.NODE_ENV !== 'production'
    ? {
      'error-store': {
        showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
        developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
      }
    }
    : {}

const isDev = /^(192\.168|localhost)/.test(window.location.host)
if (!isDev) {
  console.log = () => {}
  console.info = () => {}
  console.warn = () => {}
}

// ssl
const protocol = window.location.protocol.indexOf('https') >= 0 ? 'https://' : 'http://'
let baseUrl = `${protocol}${window.setting.reqUrl}`
// console.log(process.env.BUILD_ENV)
// if(process.env.BUILD_ENV ==  'test') {
//   let  api = `${protocol}${window.setting.reqUrl}`
//    baseUrl = `${protocol}${api}`
// }
// if(process.env.BUILD_ENV ==  'prod') {

//   let  api ='api-admin.kapay-adminapi.com'
//    baseUrl = `${protocol}${api}`
// }

// IM
let imUrl, imWSUrl, imReqUrl, nodeId
if (isDev) {
  nodeId = 500
  imUrl = 'kf.gztonban.com'
  imWSUrl = `wss://${imUrl}/chat`
  imReqUrl = `https://${imUrl}`

  // imUrl = '192.168.51.32'
  // imWSUrl = `ws://${imUrl}:7002/chat`
  // imReqUrl = `http://${imUrl}:8080`
} else {
  nodeId = window.setting.nodeId
  imUrl = window.setting.im_url
  imWSUrl = `wss://${imUrl}/chat`
  imReqUrl = `https://${imUrl}`
}

export default {
  cookieExpires: 1,
  baseUrl,
  nodeId,
  imWSUrl,
  imReqUrl,
  homeName: 'home',
  plugin,
  useI18n: true
}
