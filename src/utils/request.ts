import axios from 'axios'
import store from '../store'
import Cookie from 'js-cookie'
const baseURL = 'http://120.24.64.5:8088/mall-admin/'
// getColors
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器，加上token
instance.interceptors.request.use(
  (config) => {
    // 在头部添加token
    const token = Cookie.get('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
