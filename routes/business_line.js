/*
 * @Author: Meshy
 * @Date: 2018-01-14 01:54:35
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-03-11 15:13:44
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
  console.log(req.body)
  // res.send(resBody)
  let {businessLineName, imgUrl} = req.body
  if (!businessLineName && !imgUrl) {
    res.send({
      errInfo: 'name is not equal',
      result: 1
    })
  }
  const unit = new BusinessLineSql()
  unit.add(businessLineName, imgUrl).then(function (data) {
    let resBody = {msg: '添加成功', result: 0, id: data.insertId}
    res.send(resBody)
  })
})

/*
 * @update
 * id
 */
router.put('/business/update', function (req, res, next) {
  const unit = new BusinessLineSql()
  unit.update(req.body.id, req.body.name).then(function (data) {
    let resBody = {data, ...response}
    resBody.data = data
    res.send(resBody)
  })
})

/*
 * @add
 */
router.delete('/business/delete', function (req, res, next) {
  const unit = new BusinessLineSql()
  unit.delete(req.body.id).then(function (data) {
    let resBody = {msg: '删除成功', result: 0}
    res.send(resBody)
  })
})

module.exports = router
