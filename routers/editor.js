const router = require('koa-router')();
const EditorContent = require('../controller/editorContent');

const routers = router
    .get('/getContentById', EditorContent.getContentById)
    .post('/addContent', EditorContent.addContent);

module.exports = routers;
