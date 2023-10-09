// 导入请求方式
import http from '../service/http.js'

const userId = localStorage.getItem('userId')

// 视频上传
export function uploadFileAPI(params) {
  return http.post(`api/user/uploadFile`, params)
}

//封面上传
export function uploadCoverAPI(params) {
  return http.post(`api/user/uploadCover`, params)
}

// 封面和视频上传后的信息
export function publishVideoAPI(params) {
  return http.post(`api/user/${userId}/publishVideo`, params)
}
