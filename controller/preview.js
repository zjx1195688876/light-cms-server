const markdown = require('markdown').markdown;
const Preview = require('../models/preview.js');

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
        const condition = {'id': 1};
        let opts = {
            id: 1,
            content,
            date: new Date()
        };
        let result = {
            code: -1,
            success: false,
            message: '更新预览错误'
        };
        let isHasContent = await Preview.findOne(condition);
        if (!isHasContent) {
            let preview = new Preview({
                id: 1,
                content
            });
            await preview.save()
            .then(res => {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '添加预览成功',
                    body: res
                };
            }, err => {
                if (err) {
                    result.message = err;
                }
                ctx.body = result;
            });
        } else {
            await Preview.update(condition, opts)
            .then(res => {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '更新预览成功',
                    body: res
                };
            }, err => {
                if (err) {
                    result.message = err;
                }
                ctx.body = result;
            });
        }
    },
    async previewH5 (ctx) {
        await previewBase(ctx, 'H5');
    },
    async previewPC (ctx) {
        await previewBase(ctx, 'PC');
    }
};
