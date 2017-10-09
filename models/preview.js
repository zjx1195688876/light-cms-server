const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;

let previewSchema = new Schema({
    id: {type: String, index: true}, // id作为索引
    title: String,
    content: String
});

let previewModel = mongoose.model('Preview', previewSchema);

module.exports = previewModel;
