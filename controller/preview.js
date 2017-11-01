const markdown = require('markdown').markdown;
const Preview = require('../models/preview');
const Interceptor = require('../helpers/interceptor');
const previewBase = async (ctx, client) => {
    // 返回给前台的结果中不包含数据库特有的_id和__v
    let condition = {'id': 1};
    let opts = {
        '_id': 0,
        '__v': 0
    };
    let res;
    try {
        res = await Preview.findOne(condition, opts);
    } catch (e) {
        ctx.body = '页面无法预览，请稍后重试';
        return;
    }

    const title = res.title || '';
    const content = markdown.toHTML(res.content || '');

    await ctx.render(client, {
        title,
        content
    });
};

module.exports = {
    async updateContent (ctx) {
        const { content } = ctx.request.body;
        let preview = {
            id: 1,
            content,
            date: new Date()
        };
        delete preview._id;
        // new: true 显示新建的collection的内容，即res
        let cb = Preview.findOneAndUpdate({'id': 1}, preview, {upsert: true, new: true, setDefaultsOnInsert: true});
        await Interceptor(cb, ctx);
    },
    async previewH5 (ctx) {
        await previewBase(ctx, 'H5');
    },
    async previewPC (ctx) {
        await previewBase(ctx, 'PC');
    }
};
