var express = require('express');
var router = express.Router();
const Result = require('../models/Result')
const { md5, decoded } = require('../utils')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const jwt = require('jsonwebtoken')
const {
	login,
	findUser
} = require('../services/flow_list')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


router.post('/login', (req, res, next) => {
	let { username, password } = req.body
	password = md5(`${password}${PWD_SALT}`)
	login(username, password).then(user => {
		// console.log(user)
		if (!user || user.length === 0) {
		  new Result('登录失败').fail(res)
		} else {
		  const token = jwt.sign(
			{ username },
			PRIVATE_KEY,
			{ expiresIn: JWT_EXPIRED }
		  )
		  new Result({ token }, '登录成功').success(res)
		}
	})
});

router.get('/info', function(req, res) {
  // const decode = decoded(req)
  console.log(req)
  // if (decode && decode.username) {
  //   findUser(decode.username).then(user => {
  //     if (user) {
  //       user.roles = [user.role]
  //       new Result(user, '用户信息查询成功').success(res)
  //     } else {
  //       new Result('用户信息查询失败').fail(res)
  //     }
  //   })
  // } else {
  //   new Result('用户信息查询失败').fail(res)
  // }
})

module.exports = router;
