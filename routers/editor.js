const router = require('koa-router')();
const EditorContent = require('../controller/editorContent');

const routers = router
    // .get('/h5/:id', EditorContent.previewH5)
    // .get('/pc/:id', EditorContent.previewPC)
    .get('/getContentById', EditorContent.getContentById)
    .post('/addContent', EditorContent.addContent)
    .post('/updateContent', EditorContent.updateContent);

module.exports = routers;
