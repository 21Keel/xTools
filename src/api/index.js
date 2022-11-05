// 接口管理
import apiCall from './config'

// USER
export const reqLogin = d => apiCall.post('/login', d)
export const reqLogout = d => apiCall.post('/logout', d)
