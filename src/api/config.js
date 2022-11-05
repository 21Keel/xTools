import axios from 'axios'
import { SERVER_PATH } from '@/config'
import store from '@/store'

const apiCall = axios.create({
  baseURL: SERVER_PATH,
})

// 请求拦截器
apiCall.interceptors.request.use(config => {
  const token = store.state.token || ''
  config.headers['token'] = token
  return config
})

// 响应拦截器
apiCall.interceptors.response.use(
  res => {
    const { pass, status, message, data } = res.data
    return data
  },
  error => {
    console.log(error.message)
    return Promise.reject(error)
  }
)
export default apiCall
