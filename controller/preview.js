const Preview = require('../models/preview.js');

const previewBase = async (ctx, client) => {
    const { pageId } = ctx.params;
    // 返回给前台的结果中不包含数据库特有的_id和__v
    let condition = {'id': pageId};
    let opts = {
        '_id': 0,
        '__v': 0
    };
    let res;
    try {
        res = await Preview.find(condition, opts);
    } catch (e) {
        ctx.body = '页面无法预览，请稍后重试';
        return;
    }

    const title = res.title || '';
    const content = res.content || '';

    await ctx.render(client, {
        title,
        content
    });
};

module.exports = {
    async previewH5 (ctx) {
        await previewBase(ctx, 'H5');
    },
    async previewPC (ctx) {
        await previewBase(ctx, 'PC');
    }
};
