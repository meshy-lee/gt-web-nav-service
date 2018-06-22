/*
 * @Author: Meshy
 * @Date: 2018-01-14 01:54:35
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-06-22 13:55:01
 */
const express = require('express')
const WebsiteSql = require('./../sql/website_sql.js')
const defaultConfig = require('./../config/default')
const router = express.Router()
/*
 * @query
 */
router.get('/website/query', function (req, res, next) {
  const unit = new WebsiteSql()
  unit.query(req.query.belong).then(function (data) {
    data.forEach(ele => {
      ele.img = defaultConfig.host + ':' + defaultConfig.port + '/'  + ele.img
    })
    let resBody = {data, result: 0}
    res.send(resBody)
  }, function (err) {
    res.send({
      errInfo: err.message,
      result: err.errno
    })
  })
})

/*
 * @add
 * name
 */
router.post('/website/add', function (req, res, next) {
  const {name, url, imgUrl, belong} = req.body
  if (!name || !url || !imgUrl || !belong) {
    res.send({
      errInfo: '参数错误',
      result: 1
    })
  }
  const unit = new WebsiteSql()
  const params = {...req.body}
  params.accountList = JSON.stringify(params.accountList)
  unit.add(params).then(function (data) {
    console.log(data)
    let resBody = {msg: '添加成功', result: 0, id: data.insertId, belong: params.belong}
    res.send(resBody)
  }, function (err) {
    let resBody = {msg: err.message, result: err.errno}
    res.send(resBody)
  })
})

/*
 * @update
 * id
 */
router.put('/website/update', function (req, res, next) {
  const unit = new WebsiteSql()
  console.log(req.body)
  const params = {...req.body}
  if (!params.name || !params.url || !params.type || !params.imgUrl || !params.belong || !params.accountList || !params.id) {
    res.send({
      errInfo: '参数错误',
      result: 1
    })
  }
  params.imgUrl = params.imgUrl.replace(defaultConfig.host + ':' + defaultConfig.port + '/', '')
  params.accountList = JSON.stringify(params.accountList)
  unit.update(params).then(function (data) {
    console.log(data)
    let resBody = {msg: '修改成功', result: 0}
    resBody.data = data
    res.send(resBody)
  }, function (err) {
    let resBody = {msg: err.message, result: err.errno}
    res.send(resBody)
  })
})

/*
 * @deletd
 * id
 */
router.delete('/website/delete/:id', function (req, res, next) {
  const unit = new WebsiteSql()
  console.log(req.params)
  if (!req.params.id) {
    res.send({
      errInfo: '参数错误',
      result: 1
    })
  }
  unit.delete(req.params.id).then(function (data) {
    let resBody = {msg: '删除成功', result: 0}
    res.send(resBody)
  }, function (err) {
    let resBody = {msg: err.message, result: err.errno}
    res.send(resBody)
  })
})

module.exports = router
