import request from './request.js'

const http = {
  // 封装get请求
  /*
    	@params url 代表的是请求地址
    	@params params 代表传递的请求参数

     */
  post(url, params) {
    const config = {
      method: 'post',
      url
    }
    if (params) config.data = params
    return request(config)
  },
  get(url, params) {
    const config = {
      method: 'get', // 请求方式
      url // 请求地址
    }
    // 如果请求接口的时候传递了params那么我们就把params放到config里面，否在就不把params放在config里面了
    if (params) config.params = params
    return request(config)
  },
  delete(url, params) {
    const config = {
      method: 'delete', // 请求方式
      url // 请求地址
    }
    // 如果请求接口的时候传递了params那么我们就把params放到config里面，否在就不把params放在config里面了
    if (params) config.params = params
    return request(config)
  },
  put(url, params) {
    const config = {
      method: 'put', // 请求方式
      url // 请求地址
    }
    // 如果请求接口的时候传递了params那么我们就把params放到config里面，否在就不把params放在config里面了
    if (params) config.data = params
    return request(config)
  }
}
export default http
