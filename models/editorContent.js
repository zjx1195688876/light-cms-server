const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;

let editorContentSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    content: String,
    date: { type: Date, default: Date.now }
});

// 根据定义的blog schema 生成modal
let editorContentModel = mongoose.model('EditorContent', editorContentSchema);

module.exports = editorContentModel;
