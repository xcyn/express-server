var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Demos = require('../models/demos') //加载模型表

mongoose.connect('mongodb://127.0.0.1:27017/demo');

mongoose.connection.on('connented', function() {
  console.log('mongodb正在连接....')
});

mongoose.connection.on('error', function() {
  console.log('mongodb连接失败')
});

mongoose.connection.on('disconnected', function() {
  console.log('mongodb断开连接')
});

router.get('/', function( request, responese, next ) {
  let page = parseInt(request.param('page'))
  let pageSize = parseInt(request.param('pageSize'))
  let sort = request.param('sort')
  let skip = ( page - 1 ) * pageSize
  let params = {}
  let Demo = Demos.find().skip(skip).limit(pageSize)
  //通过id来升序和降序
  Demo.sort({ 'id': sort })
  Demo.exec(function(err, doc) {
    if( err ) {
      responese.json({
        status: 0,
        message: err.message
      })
    } else {
      responese.json({
        status: 1,
        message: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router;