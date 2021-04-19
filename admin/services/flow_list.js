const { querySql, queryOne } = require('../db')

function login(username, password) {
    return querySql(`select * from admin_user where username='${username}' and password = '${password}'`)
}

function findUser(username) {
    return queryOne(`select id, username, nickname, role, avatar from admin_user where username='${username}'`)
}

function findFlowList() {
    return querySql(`select * from flow_list`)
}

function insertCity(province, city) {
    let arr = []
    return querySql(`insert into city_list(id, province, city) values(null, '省份', '城市')`)
}

module.exports = {
    login,
    findUser,
    findFlowList,
    insertCity
}


// CREATE TABLE `city_list` (
//     `Id` int(11) NOT NULL AUTO_INCREMENT,  
//     `province` varchar(18) NOT NULL unique,
//     `city` varchar(18) NOT NULL unique,
//     `taday_pv` int(18) NOT NULL,
//     `taday_uv` int(18) NOT NULL,
//     `taday_ip` int(18) NOT NULL,
//     `target_uv` int(18) NOT NULL,
//     `sum_uv` int(18) NOT NULL,
//     `time` datetime NOT NULL,
//     `month` varchar(8) NOT NULL,
// PRIMARY KEY (`Id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8;
