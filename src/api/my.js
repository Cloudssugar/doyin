// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

// 我的 个人信息
export function getgetUserInfoAPI(params) {
  return http.get(`api/user/${userId}/getUserInfo/undefined`)
}

// 我的 关注的人数
export function getFollowersNumAPI(params) {
  return http.get(`api/user/${userId}/FollowersNum`)
}

// 我的 粉丝
export function getFansNumAPI(params) {
  return http.get(`api/user/${userId}/FansNum`)
}

// 我的 获赞数
export function getbyLikesNumAPI(params) {
  return http.get(`api/user/${userId}/byLikesNum`)
}


// 我的  作品和 动态
export function getVideosNumAPI(params) {
  return http.get(`api/user/${userId}/VideosNum`)
}

// 我的 喜欢视频
export function getLikesNumPI(params) {
  return http.get(`api/user/${userId}/LikesNum`)
}

// 视频详情 getvideolikesAPI
export function getvideolikesAPI(params) {
  return http.get(`api/user/${userId}/Videos/page/1`)
}

// 我喜欢的视频
export function getLikesAPI(params) {
  return http.get(`api/user/${userId}/Likes/page/1`)
}

// 修改个人信息
export function modifyUserInfoAPI(params) {
  return http.post(`api/user/${userId}/modifyUserInfo`,params)
}
