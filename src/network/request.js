import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
})

// 导出封装的网络请求函数
export function request(config) {
    return instance(config)
}

// 请求拦截
instance.interceptors.request.use(config => {
    // 是否携带cookie
    config.withCredentials = false
    // 添加token到本地
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截
instance.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})