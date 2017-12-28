const multer = require('koa-multer')();
const router = require('koa-router')();
const FroalaUpload = require('../controller/froalaUpload');

const routers = router
    .post('/', multer.single('file'), FroalaUpload);

module.exports = routers;
