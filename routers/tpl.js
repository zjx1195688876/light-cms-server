const router = require('koa-router')();
const TplList = require('../controller/tplList');

console.log(123);
const routers = router
    .get('/getTplList', TplList.getTplList)
    .get('/getTplItemById', TplList.getTplItemById)
    .post('/addTpl', TplList.addTpl)
    .post('/updateTpl', TplList.updateTpl);

module.exports = routers;
