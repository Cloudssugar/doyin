// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

// 我关注的动态
export function getFollowerVideoAPI(page) {
  return http.get(`api/user/${userId}/FollowerVideo/page/${page}`)
}

// 我关注的动态 点赞
export function getFollowerVideotriggerLikeAPI(params) {
  return http.get(`api/user/${userId}/triggerLike/${params}`)
}
