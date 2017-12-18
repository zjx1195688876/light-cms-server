const EditorContent = require('../models/editorContent');
const Interceptor = require('../helpers/interceptor');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async getContentById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let cb = EditorContent.findOne(conditon, opts);
        await Interceptor(cb, ctx);
    },
    async addOrUpdateContent (ctx) {
        const { id, content, date } = ctx.request.body;
        let editorContent = {
            id,
            content,
            date
        };
        delete editorContent._id;
        // new: true 显示新建的collection的内容，即res
        let cb = EditorContent.findOneAndUpdate({'id': id}, editorContent, {upsert: true, new: true, setDefaultsOnInsert: true});
        await Interceptor(cb, ctx);
    }
};
