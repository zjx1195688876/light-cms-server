const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tplItemSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    imgUrl: String,
    title: String,
    desc: String,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let tplItemModal = mongoose.model('TplItem', tplItemSchema);

module.exports = tplItemModal;