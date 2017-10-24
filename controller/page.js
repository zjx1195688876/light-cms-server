const mongoose = require('../models/mongoose');
// const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const grid = require('gridfs-stream');
const markdown = require('markdown').markdown;
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
    },
    async addFile (ctx) {
        const { name, title, content } = ctx.request.body;
        const contentHTML = markdown.toHTML(content || '');
        // const gfs = grid(mongoose.connection.db, mongoose.mongo);
        /*eslint-disable*/
        const pcFile = path.resolve(__dirname, '../static/pages/pc/' + name + '.html');
        const h5File = path.resolve(__dirname, '../static/pages/h5/' + name + '.html');
        /*eslint-enable*/
        const pcFileData = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>${title}</title>
                <style type="text/css">
                    * {margin: 0; padding: 0;}
                    .header, .footer { height: 50px; line-height: 50px; font-size: 13px; text-align: center; background-color: #e5e5e5; }
                </style>
            </head>
            <body>
                <div class="header">
                    这是header
                </div>
                <div class="container">
                    ${contentHTML}
                </div>
                <div class="footer">
                    这是footer
                </div>
            </body>
            </html>`;
        const h5FileData = `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                <meta name="format-detection"content="telephone=no,email=no" />
                <title>${title}</title>
                <style type="text/css">
                    * {margin: 0; padding: 0;}
                    .header, .footer { height: 50px; line-height: 50px; font-size: 13px; text-align: center; background-color: #e5e5e5; }
                </style>
            </head>
            <body>
                <div class="header">
                    这是header
                </div>
                <div class="container">
                    ${contentHTML}
                </div>
                <div class="footer">
                    这是footer
                </div>
            </body>
            </html>`;
        fs.writeFile(pcFile, pcFileData, err => {
            if (err) throw err;
        });
        fs.writeFile(h5File, h5FileData, err => {
            if (err) throw err;
        });
        // let writestreamPc = gfs.createWriteStream({
        //     filename: name
        // });
        // let writestreamH5 = gfs.createWriteStream({
        //     filename: name
        // });
        // fs.createReadStream(pcFile).pipe(writestreamPc);
        // fs.createReadStream(h5File).pipe(writestreamH5);
    }
};
