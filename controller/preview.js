const Preview = require('../models/preview.js');

module.exports = {
    async previewH5 (ctx) {
        // console.log(ctx.params);
        // const title = ctx.query.title || '';
        // const content = 'previewH5 content';
        // await ctx.render('H5', {
        //     title,
        //     content
        // });

        const { pageId } = ctx.params;
        console.log(pageId);
        // 返回给前台的结果中不包含数据库特有的_id和__v
        let condition = {'id': pageId};
        let opts = {
            '_id': 0,
            '__v': 0
        };
        await Preview.find(condition, opts)
        .then(res => {
            const title = res.title || '';
            const content = res.content || '';
            ctx.render('H5', {
                title,
                content
            });
        }, () => {
            ctx.body = '页面无法预览，请稍后重试';
        });
    }
};
