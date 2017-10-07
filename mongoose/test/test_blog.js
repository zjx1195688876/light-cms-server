const mongoose = require('../index.js');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
    id: {type: Number, index: true}, // id作为索引
    title: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now },
    hidden: Boolean
});

// 根据定义的blog schema 生成modal
let blogModal = mongoose.model('Blog', blogSchema);

module.exports = blogModal;
