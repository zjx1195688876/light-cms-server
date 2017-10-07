const router = require('koa-router')();
const TplList = require('../controller');

console.log(123);
const routers = router
    // .get('/getTplList', async (ctx) => {
    //     console.log(ctx);
    // });
    .get('/getTplList', TplList.getTplList);

module.exports = routers;
