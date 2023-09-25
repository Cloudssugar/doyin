// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

// 粉丝列表
export function getFansoAPI(params) {
  return http.get(`api/user/${userId}/Fans/page/1/${userId}`)
}

// 粉丝关注
export function gettriggerFollowAPI(params) {
  return http.get(`api/user/${userId}/triggerFollow/${params}`)
}

// 赞我的
export function getbyLikeAPI(params) {
  return http.get(`api/user/${userId}/byLike/page/1`)
}

// @我的
export function getAtAPI(params) {
  return http.get(`api/user/${userId}/getAt/page/1`)
}

// 评论
export function getbyCommentAPI(params) {
  return http.get(`api/user/${userId}/byComment/page/1`)
}

// 联系人
export function getContactAPI(params) {
  return http.get(`api/user/${userId}/getContact`)
}