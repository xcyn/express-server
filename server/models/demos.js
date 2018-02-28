var mongoose = require('mongoose')
var Schema = mongoose.Schema; //定义模型

var goodsSchema = new Schema({
  id: Number,
  name: String
})

module.exports = mongoose.model('creauser_copy', goodsSchema, 'creauser_copy' )
