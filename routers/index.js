const router = require('koa-router')();
const tpl = require('./tpl');
const preview = require('./preview');
const editor = require('./editor');
const page = require('./page');
const login = require('./login');

router.use('/tpl', tpl.routes(), tpl.allowedMethods());
router.use('/preview', preview.routes(), preview.allowedMethods());
router.use('/editor', editor.routes(), editor.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());

module.exports = router;
