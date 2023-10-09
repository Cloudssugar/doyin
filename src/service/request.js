// 导入axios
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入消息 文件
import MessageMainVue from '../components/js/message.js'

// 创建axios实例
const service = axios.create({
  // 公共接口前缀 正常应该从环境变量中获取
  baseURL: '/api',
  timeout: 5000, // 请求超时时间
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false // default
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 发送请求前做什么处理：数据转换、请求头配置、token携带、loading，根据需求去添加
    // 添加Authorization请求头，用于验证用户身份
    const userId = localStorage.getItem('userId')

    // Vue.prototype.$message.error('请求超时')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么 做一些接口请求成功以后的提示处理、关闭loading
    // console.log(response.status)
    if (response.status === 200) {
      const res = response.data
      /* 如果 code 是-1 说明用户注销 或者 或者token已经过期了 */
      /* 需要消除localStoreage 和 清除vuex的token */
      if (res.code === -1) {
        clearHandler()
      }
    }

    return response
  },
  function (error) {
    // 对响应错误做点什么，做一些接口请求失败以后的提示处理，比如404路径错误、403没有权限等等处理
    /*判断一下未授权 */
    // 统一处理HTTP错误状态码
    console.log(error)

    if (error) {
      // console.log(error.response.status.message)
      switch (error.response.status) {
        case 400:
          // clearHandler()
          MessageMainVue({ type: 'warn', text: '出错啦T^T' })
          // router.replace('/login')
          break
        case 404:
          clearHandler()
          MessageMainVue({ type: 'warn', text: '页面出错啦，重新登陆(・ω<)' })
          // router.replace('/login')
          break
        case 500:
          // clearHandler()
          MessageMainVue({ type: 'warn', text: '网络被吃了(▼ヘ▼#)' })
          break
        default:
        // 处理其它HTTP错误
      }
    }

    return Promise.reject(error)
  }
)

// 用来清空localStoreage
function clearHandler() {
  localStorage.removeItem('userId')
}

export default service
