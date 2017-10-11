const router = require('koa-router')();
const Preview = require('../controller/preview');

const routers = router
    .get('/h5/:pageId', Preview.previewH5)
    .get('/pc/:pageId', Preview.previewPC)
    ;

module.exports = routers;
