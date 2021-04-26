// 添加JWT认证
// npm i -S express-jwt
const jwt = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

module.exports = jwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true, //设置为false为关闭验证，游客可以访问
  algorithms: ['HS256'],
}).unless({
  path: [
    '/',
    '/user/login'
  ]// 设置jwt白名单
})
 