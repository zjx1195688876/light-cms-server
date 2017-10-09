const router = require('koa-router')();
const Preview = require('../controller/preview');

const routers = router
    .get('/H5/:pageId', Preview.previewH5)
    /*.get('/PC/:pageId', async (ctx) => {
        console.log(ctx);
        const title = ctx.query.title || '';
        const content = 'previewPC content';
        await ctx.render('PC', {
            title,
            content
        });
    })
    .get('/H5/:pageId', async (ctx) => {
        console.log(ctx.params);
        Preview.find(condition, opts)
        .then(res => {
            console.log(res);
            ctx.body = {
                code: 200,
                success: true,
                message: '获取PC预览页面成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
        const title = ctx.query.title || '';
        const content = 'previewH5 content';
        await ctx.render('H5', {
            title,
            content
        });
    })*/;

module.exports = routers;
