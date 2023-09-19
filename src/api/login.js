// 导入请求方式
import http from '../service/http.js'


// 获取验证码
export function getCodeAPI(params) {
  return http.get(`api/common/user/getCode/${params}`)
}

// 注册
export function postregisterAPI(params){
  return http.post('api/common/user/register',params)
}

// 登录
export function postloginAPI(params){
  return http.post('api/common/user/loginByPassword',params)
}