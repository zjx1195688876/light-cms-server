const mongoose = require('./mongoose');
const Schema = mongoose.Schema;

let editorContentSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    content: String,
    tplStyle: { type: String, default: '0' }, // 模板类型，0：markdown；1：富文本
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let editorContentModel = mongoose.model('EditorContent', editorContentSchema);

module.exports = editorContentModel;
