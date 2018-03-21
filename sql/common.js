/*
 * @Author: Meshy
 * @Date: 2018-01-15 11:11:51
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-03-10 18:58:06
 */

const mysql = require('mysql')
const sqlConfig = require('./../config/sql_config.json')

const pool = mysql.createPool(sqlConfig)

class CommonModuler {
  uploadImg (data) {
    // console.log(data)
    // let sql = `insert into teachers value(null, '${businessLineName}', '${businessLineIcon}')`
    // return new Promise((resolve, reject) => {
    //   pool.getConnection(function (error, connection) {
    //     connection.query(sql, function (error, response) {
    //       if (error) {
    //         console.log('[SELECT ERROR] - ', error.message)
    //         return
    //       }
    //       resolve(response)
    //       // 释放链接
    //       connection.release()
    //     })
    //   })
    // })
  }
}
module.exports = CommonModuler
