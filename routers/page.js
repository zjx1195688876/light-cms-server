const router = require('koa-router')();
const Page = require('../controller/page');

const routers = router
    .get('/getPageList', Page.getPageList)
    .get('/getPageById', Page.getPageById)
    .post('/addPage', Page.addPage)
    .post('/updatePage', Page.updatePage)
    .post('/removePage', Page.removePage);
    // .post('/addTpl', Page.addPage);

module.exports = routers;
