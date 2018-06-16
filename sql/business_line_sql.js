/*
 * @Author: Meshy
 * @Date: 2018-01-15 11:11:51
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-03-11 15:13:55
 */

const mysql = require('mysql')
const sqlConfig = require('./../config/sql_config.json')

const pool = mysql.createPool(sqlConfig)

class BusinessLineSql {
  add (businessLineName, imgUrl) {
    let sql = `insert into business_line value(null, '${businessLineName}', '${imgUrl}')`
    return new Promise((resolve, reject) => {
      pool.getConnection(function (error, connection) {
        connection.query(sql, function (error, response) {
          if (error) {
            reject(error)
            // console.log('[SELECT ERROR] - ', error.message)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
  query (word) {
    let sql = 'SELECT * FROM business_line'
    if (word) {
      sql += ` where name='${word}'`
    }
    console.warn(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
  update (id, name, url) {
    let sql = `update business_line set name='${name}', url='${url}' where id='${id}'`
    console.log(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
  delete (id) {
    let sql = `delete from business_line where id='${id}'`
    console.log(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
}
module.exports = BusinessLineSql
