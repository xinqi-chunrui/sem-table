import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    const errMsg = res.msg || '请求失败';
    if (res.code !== 0) {
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('Token 已失效，是否重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消 ',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },
  error => {
    // console.log('err:' + error) // for debug
    // console.log({ error })
    const { msg } = error.response.data
    Message({
      message: msg || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
