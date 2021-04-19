const mysql = require('mysql')
const config = require('./config')
const { debug } = require('../utils/constant')

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
  })
}

function querySql(sql) {
  const conn = connect()
  debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          debug && console.log('查询失败，原因:' + JSON.stringify(err))
          reject(err)
        } else {
          debug && console.log('查询成功', JSON.stringify(results))
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}

function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(results => {
      if (results && results.length > 0) {
        resolve(results[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  querySql,
  queryOne
}

// CREATE TABLE `sem_list` (
//     `Id` int(11) NOT NULL AUTO_INCREMENT,  
//     `cityid` int(11) NOT NULL unique,
//     `over_all_cost` int(11) NOT NULL unique,
//     `cost_baidu` int(18) NOT NULL,
//     `cost_360` int(18) NOT NULL,
//     `cost_sogo` int(18) NOT NULL,
//     `cost_uc` int(18) NOT NULL,
//     `cost_jr` int(18) NOT NULL,
//     `cost_xxl` int(18) NOT NULL,
//     `phone_count` int(18) NOT NULL,
//     `meituan` int(18) NOT NULL,
//     `phone_cost` int(18) NOT NULL,
//     `sign_bill_count` int(18) NOT NULL,
//     `sign_bill_sum` int(18) NOT NULL,
//     `year` int(3) NOT NULL unique,
//     `month` int(3) NOT NULL unique,
// PRIMARY KEY (`Id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8;