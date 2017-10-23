// const mongoose = require('../model/mongoose.js');
// const formidable = require('formidable');
// const grid = require('gridfs-stream');
// const fs = require('fs');
const Page = require('../models/page.js');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async getPageList (ctx) {
        const { limit, currentPage } = ctx.query;
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = (Number(currentPage) - 1) * limit;   // 跳过数
        let result = {
            code: -1,
            success: false,
            message: '获取页面列表错误'
        };
        await Page.find({disable: false}, opts).skip(skipnum).limit(Number(limit)).sort(sort).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取页面列表成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async getPageById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let result = {
            code: -1,
            success: false,
            message: '获取页面错误'
        };
        await Page.findOne(conditon, opts).then((res) => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取页面成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async addPage (ctx) {
        const { id, title, name } = ctx.request.body;
        let page = new Page({
            id,
            title,
            name,
            date: new Date()
        });
        let result = {
            code: -1,
            success: false,
            message: '添加页面错误'
        };
        await page.save()
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '添加页面成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async updatePage (ctx) {
        const { id, title, name } = ctx.request.body;
        const condition = {'id': id};
        let opts = {
            id,
            title,
            name,
            date: new Date()
        };
        let result = {
            code: -1,
            success: false,
            message: '更新页面错误'
        };
        await Page.update(condition, opts)
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '更新页面成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async removePage (ctx) {
        const { id } = ctx.request.body;
        const condition = {'id': id};
        let opts = {
            id,
            disable: true,
            date: new Date()
        };
        let result = {
            code: -1,
            success: false,
            message: '删除页面错误'
        };
        await Page.update(condition, opts)
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '删除页面成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    }
    // async addPage (ctx) {
    //     console.log(ctx);
    //     console.log(ctx.req);
    //     console.log(ctx.request);
    //     return;
    //     // const form = new formidable.IncomingForm();
    //     // /*eslint-disable*/
    //     // form.uploadDir = __dirname + '/static/pages';
    //     // /*eslint-enable*/
    //     // form.keepExtensions = true;
    //     // form.parse(ctx.request, (err, fields, files) => {
    //     //     if (!err) {
    //     //         let gfs = grid(mongoose);
    //     //         let writestream = gfs.createWriteStream({
    //     //             filename: files.file.name
    //     //         });
    //     //         fs.createReadStream(files.file.path).pipe(writestream);
    //     //     }
    //     // });
    // },
};
