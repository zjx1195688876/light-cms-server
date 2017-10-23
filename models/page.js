const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;

let pageSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    title: String,
    name: String,
    disable: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let pageModel = mongoose.model('Page', pageSchema);

module.exports = pageModel;
