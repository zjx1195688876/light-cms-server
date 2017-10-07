const router = require('koa-router')();
const tpl = require('./tpl.js');

router.use('/tpl', tpl.routes(), tpl.allowedMethods());

module.exports = router;
