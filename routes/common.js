/*
 * @Author: Meshy
 * @Date: 2018-01-14 01:54:35
 * @Last Modified by: Meshy
 * @Last Modified time: 2018-06-22 11:22:08
 */
const express = require('express')
const multer = require('multer')
const fs = require('fs')
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
  filename: function(req, file, callback) {
    let fileformat = (file.originalname).split('.')
    callback(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1])
  }
})
const upload = multer({
  storage: storage
})

router.post('/uploadImg', upload.single('file'), function(req, res, next) {
  let resBody
  if ((req.file.size / 1024).toFixed(2) > 100) {
    resBody = {
      msg: '图片不能超过100KB！',
      result: 1
    }
    res.send(resBody)
    return
  }
  resBody = {
    msg: '上传成功',
    result: 0,
    url: req.file.path //.replace('public/', '')
  }
  res.send(resBody)
  return
})

module.exports = router