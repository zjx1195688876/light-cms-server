const router = require('koa-router')();
const Preview = require('../controller/preview');

const routers = router
    .get('/h5', Preview.previewH5)
    .get('/pc', Preview.previewPC)
    .post('/updateContent', Preview.updateContent);

module.exports = routers;
