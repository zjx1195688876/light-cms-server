// const markdown = require('markdown').markdown;
const EditorContent = require('../models/editorContent.js');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

/* const previewBase = async (ctx, client) => {
    const { id } = ctx.params;
    // 返回给前台的结果中不包含数据库特有的_id和__v
    let condition = {'id': id};
    let opts = {
        '_id': 0,
        '__v': 0
    };
    let res;
    try {
        res = await EditorContent.findOne(condition, opts);
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
}; */

module.exports = {
    async getContentById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let result = {
            code: -1,
            success: false,
            message: '获取模板内容错误'
        };
        await EditorContent.findOne(conditon, opts).then((res) => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取模板内容成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async addContent (ctx) {
        const { id, content, date } = ctx.request.body;
        let tplContent = new EditorContent({
            id,
            content,
            date
        });
        let result = {
            code: -1,
            success: false,
            message: '添加模板错误'
        };
        await tplContent.save()
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '添加模板成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async updateContent (ctx) {
        const { id, content } = ctx.request.body;
        const condition = {'id': id};
        let opts = {
            id,
            content,
            date: new Date()
        };
        let result = {
            code: -1,
            success: false,
            message: '更新模板错误'
        };
        await EditorContent.update(condition, opts)
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '更新模板成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    }
    /* async previewH5 (ctx) {
        await previewBase(ctx, 'H5');
    },
    async previewPC (ctx) {
        await previewBase(ctx, 'PC');
    } */
};
