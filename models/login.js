const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: String,
    password: String
});

// 根据定义的blog schema 生成modal
let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
