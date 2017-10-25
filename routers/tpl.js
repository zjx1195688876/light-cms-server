const router = require('koa-router')();
const TplList = require('../controller/tplList');

console.log(123);
const routers = router
    .get('/getTotal', TplList.getTotal)
    .get('/getTplList', TplList.getTplList)
    .get('/getTplItemById', TplList.getTplItemById)
    .post('/addOrUpdateTpl', TplList.addOrUpdateTpl);

module.exports = routers;
