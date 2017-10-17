const router = require('koa-router')();
const tpl = require('./tpl');
const preview = require('./preview');
const editor = require('./editor');

router.use('/tpl', tpl.routes(), tpl.allowedMethods());
router.use('/preview', preview.routes(), preview.allowedMethods());
router.use('/editor', editor.routes(), editor.allowedMethods());

module.exports = router;
