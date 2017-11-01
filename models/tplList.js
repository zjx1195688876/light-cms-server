const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

let tplListSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    imgName: String,
    imgUrl: String,
    title: String,
    desc: String,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let tplListModal = mongoose.model('TplList', tplListSchema);

module.exports = tplListModal;
