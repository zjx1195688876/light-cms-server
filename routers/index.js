const router = require('koa-router')();
const tpl = require('./tpl');
const preview = require('./preview');

router.use('/tpl', tpl.routes(), tpl.allowedMethods());
router.use('/preview', preview.routes(), preview.allowedMethods());

module.exports = router;
