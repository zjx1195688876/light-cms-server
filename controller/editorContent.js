const EditorContent = require('../models/editorContent.js');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

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
    }
};
