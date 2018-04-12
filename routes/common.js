/*
 * @Author: Meshy
 * @Date: 2018-01-14 01:54:35
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-04-11 14:29:52
 */
const express = require('express')
const multer  = require('multer')
const fs  = require('fs')
const defaultJson = require('./../config/default.json')

const CommonModuler = require('./../sql/common')
const response = require('./response')

const router = express.Router()

/*
 * @add
 * name
 */
const storage = multer.diskStorage({
    //上传图片的路径，是在你的静态目录下（public）uploads会自动进行创建
    destination: 'public/upload_img',
    // size:
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, callback){
        let fileformat = (file.originalname).split('.')
        callback(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1])
    }
})
const upload = multer({
  storage: storage
})

router.post('/uploadImg', upload.single('file'), function (req, res, next) {
  console.dir(req.file)
  // for(let i in req.body) {
  //   console.dir(i, 1111)
  // }
  // console.log('====================================================')
  // console.log('fieldname: ' + req.body.file)
  // console.log('originalname: ' + req.file.originalname)
  // // console.log('encoding: ' + req.file.encoding)
  // // console.log('mimetype: ' + req.file.mimetype)
  console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB')
  console.log('destination: ' + req.file.destination)
  // console.log('filename: ' + req.file.filename)
  // console.log('path: ' + req.file.path)
  let resBody = {
    msg: '上传成功',
    result: 0,
    url: defaultJson.host + defaultJson.port + '/' +req.file.path //.replace('public/', '')
  }
  res.send(resBody)
  return
  // let {businessLineName, businessLineIcon} = req.body
  // if (!businessLineName && !businessLineIcon) {
  //   res.send({
  //     errInfo: 'name is not equal',
  //     result: 1
  //   })
  // }
  // const unit = new CommonModuler()
  // unit.uploadImg(businessLineName, businessLineIcon).then(function (data) {
  //   let resBody = {msg: '上传成功', result: 0, id: data.insertId}
  //   res.send(resBody)
  // })
})

module.exports = router
