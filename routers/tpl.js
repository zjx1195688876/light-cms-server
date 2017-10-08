const router = require('koa-router')();
const TplList = require('../controller/tplList');

console.log(123);
const routers = router
    .get('/getTplList', TplList.getTplList)
    .post('/addTpl', TplList.addTpl);

module.exports = routers;
