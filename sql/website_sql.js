/*
 * @Author: Meshy
 * @Date: 2018-01-15 11:11:51
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-03-11 15:13:55
 */

const mysql = require('mysql')
const sqlConfig = require('./../config/sql_config.json')

const pool = mysql.createPool(sqlConfig)

class WebsiteSql {
  add (params) {
    let sql = `insert into website value(null, '${params.name}', '${params.url}', '${params.type}', '${params.imgUrl}', '${params.belong}', '${params.accountList}')`
    return new Promise((resolve, reject) => {
      pool.getConnection(function (error, connection) {
        connection.query(sql, function (error, response) {
          if (error) {
            reject(error)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
  query (belong) {
    let sql = `SELECT * FROM website `
    if (belong) {
      sql += `where belong = ${belong}`
    }
    console.warn(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            reject(err)
            return
          }
          resolve(response)
          // 释放链接
          connection.release()
        })
      })
    })
  }
  update (params) {
    console.log(111111)
    let sql = `update website set name='${params.name}', url='${params.url}', type='${params.type}', img='${params.imgUrl}', belong='${params.belong}', accountList='${params.accountList}'  where id='${params.id}'`
    console.log(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            reject(err)
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
    let sql = `delete from website where id='${id}'`
    console.log(sql)
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, response) {
          if (err) {
            reject(err)
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
module.exports = WebsiteSql
