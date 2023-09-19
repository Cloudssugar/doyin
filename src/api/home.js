// 导入请求方式
import http from '../service/http.js'

const userId=localStorage.getItem('userId')

// 获取首页数据
export function getPopularVideoAPI(params) {
  return http.get(`api/common/video/getPopularVideo`, params)
}

// 点赞
export function triggerLikeAPI(params) {
  return http.get(`api/user/${userId}/triggerLike/${params}`)
}

