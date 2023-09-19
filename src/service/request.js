// 导入axios
import axios from 'axios'

// 创建axios实例
const service = axios.create({
    // 公共接口前缀 正常应该从环境变量中获取
    baseURL: '/api',
    timeout: 3000,
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false // default
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么 发送请求前做什么处理：数据转换、请求头配置、token携带、loading，根据需求去添加
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么 做一些接口请求成功以后的提示处理、关闭loading
    return response;
  }, function (error) {
    // 对响应错误做点什么，做一些接口请求失败以后的提示处理，比如404路径错误、403没有权限等等处理
    return Promise.reject(error);
  }); 

export default service