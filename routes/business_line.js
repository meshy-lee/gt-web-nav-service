/*
 * @Author: Meshy
 * @Date: 2018-01-14 01:54:35
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-04-11 14:23:26
 */
const express = require('express')
const BusinessLineSql = require('./../sql/index')
const response = require('./response')

const router = express.Router()
/*
 * @query
 */
router.get('/business/query', function (req, res, next) {
  const unit = new BusinessLineSql()
  unit.query(req.query.name).then(function (data) {
    let resBody = {data, ...response} // JSON.parse(JSON.stringify(response))
    resBody.data = data
    res.send(resBody)
  })
})

/*
 * @add
 * name
 */
router.post('/business/add', function (req, res, next) {
  // res.send(resBody)
  let {businessLineName, imgUrl} = req.body
  if (!businessLineName && !imgUrl) {
    res.send({
      errInfo: '参数错误',
      result: 1
    })
  }
  const unit = new BusinessLineSql()
  unit.add(businessLineName, imgUrl).then(function (data) {
    let resBody = {msg: '添加成功', result: 0, id: data.insertId}
    res.send(resBody)
  }, function (err) {
    console.log(err)
    let resBody = {msg: err.message, result: err.errno}
    res.send(resBody)
  })
})

/*
 * @update
 * id
 */
router.put('/business/update', function (req, res, next) {
  const unit = new BusinessLineSql()
  unit.update(req.body.id, req.body.businessLineName, req.body.imgUrl).then(function (data) {
    // let resBody = {data, ...response}
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
router.delete('/business/delete/:id', function (req, res, next) {
  const unit = new BusinessLineSql()
  console.log(req.params)
  unit.delete(req.params.id).then(function (data) {
    let resBody = {msg: '删除成功', result: 0}
    res.send(resBody)
  }, function (err) {
    let resBody = {msg: err.message, result: err.errno}
    res.send(resBody)
  })
})

module.exports = router
