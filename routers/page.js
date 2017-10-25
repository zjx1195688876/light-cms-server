const router = require('koa-router')();
const Page = require('../controller/page');

const routers = router
    .get('/getTotal', Page.getTotal)
    .get('/getPageList', Page.getPageList)
    .get('/getPageById', Page.getPageById)
    .post('/removePage', Page.removePage)
    .post('/addOrUpdatePage', Page.addOrUpdatePage)
    .post('/addOrUpdateFile', Page.addOrUpdateFile);

module.exports = routers;
