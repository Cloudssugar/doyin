// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

// 获取首页数据
export function getPopularVideoAPI(params) {
  return http.get(`api/common/video/getPopularVideo`, params)
}

// 点赞
export function triggerLikeAPI(params) {
  return http.get(`api/user/${userId}/triggerLike/${params}`)
} 

// 评论列表
export function getVideoCommentAPI(params) {
  return http.get(`api/video/${params}/getVideoComment/page/1`,)
}

// 发表评论
export function commentVideoAPI(params) {
  return http.post(`api/user/commentVideo`,params)
}

// 评论里的点赞
export function triggerLikeCommentAPI(params) {
  return http.get(`api/user/${userId}/triggerLikeComment/${params.videoId}/${params.commentId}`)
}

// 搜索视频
export function searchVideoAPI(params) {
  return http.post(`api/user/${userId}/searchVideo/1`,params)
} 

// 搜索用户
export function searchUserAPI(params) {
  return http.post(`api/user/${userId}/searchUser/1`,params)
}

// 关注取消用户
export function triggerFollowAPI(params) {
  return http.get(`api/user/${userId}/triggerFollow/${params}`)
}
