// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

const toUserId=localStorage.getItem('toUserId')
console.log(localStorage.getItem('toUserId'),'9999999');
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

// 新增粉丝未读数量
export function getFanUnreadNumAPI(params) {
  return http.get(`api/user/${userId}/FanUnreadNum`)
}

// 新增粉丝全部读取
export function getreadAllFanMsgAPI(params) {
  return http.get(`api/user/${userId}/readAllFanMsg`)
}

// 新增赞未读数量  
export function getbyLikeUnreadNumAPI(params) {
  return http.get(`api/user/${userId}/byLikeUnreadNum`)
}

// 新增赞已读数量 
export function getreadAllByLikeMsgAPI(params) {
  return http.get(`api/user/${userId}/readAllByLikeMsg`)
}


// 新增@未读数量
export function getAtUnreadNumAPI(params) {
  return http.get(`api/user/${userId}/getAtUnreadNum`)
}

// 新增@未读数量
export function getreadAllAtAPI(params) {
  return http.get(`api/user/${userId}/readAllAt`)
}

// 新增评论未读数量
export function getbyCommentUnreadNumAPI(params) {
  return http.get(`api/user/${userId}/byCommentUnreadNum`)
}

// 新增评论已读数量
export function getreadAllByCommentMsgAPI(params) {
  return http.get(`api/user/${userId}/readAllByCommentMsg`)
}

// 获取聊天信息
export function getPrivateLetterAPI(params) {
  return http.get(`api/user/${userId}/getPrivateLetter/${params}`)
}

// 读取聊天信息
export function readPrivateLetterAPI(params) {
  return http.get(`api/user/${userId}/readPrivateLetter/${params}`)
}

// 发送聊天信息
export function privateLetterAPI(params) {
  return http.post(`api/user/${userId}/privateLetter/${toUserId}`,params)
}