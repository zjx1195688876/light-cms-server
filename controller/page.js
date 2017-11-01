const path = require('path');
const fs = require('fs');
const markdown = require('markdown').markdown;
const Page = require('../models/page');
const PCTpl = require('../template/pc');
const H5Tpl = require('../template/h5');
const Interceptor = require('../helpers/interceptor');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async getTotal (ctx) {
        let cb = Page.count({disable: false});
        await Interceptor(cb, ctx);
    },
    async getPageList (ctx) {
        const { limit, currentPage } = ctx.query;
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = (Number(currentPage) - 1) * limit;   // 跳过数
        let cb = Page.find({disable: false}, opts).skip(skipnum).limit(Number(limit)).sort(sort).exec();
        await Interceptor(cb, ctx);
    },
    async getPageById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let cb = Page.findOne(conditon, opts);
        await Interceptor(cb, ctx);
    },
    async addOrUpdatePage (ctx) {
        const { id, title, name } = ctx.request.body;
        let page = {
            id,
            title,
            name,
            date: new Date()
        };
        delete page._id;
        // new: true 显示新建的collection的内容，即res
        let cb = Page.findOneAndUpdate({'id': id}, page, {upsert: true, new: true, setDefaultsOnInsert: true});
        await Interceptor(cb, ctx);
    },
    async removePage (ctx) {
        const { id } = ctx.request.body;
        const condition = {'id': id};
        let opts = {
            id,
            disable: true,
            date: new Date()
        };
        let cb = Page.update(condition, opts);
        await Interceptor(cb, ctx);
    },
    async addOrUpdateFile (ctx) {
        const { id, title, content } = ctx.request.body;
        const contentHTML = markdown.toHTML(content || '');
        /*eslint-disable*/
        const pcFile = path.resolve(__dirname, '../static/pages/pc/' + id + '.html');
        const h5File = path.resolve(__dirname, '../static/pages/h5/' + id + '.html');
        /*eslint-enable*/
        const pcFileData = PCTpl(title, contentHTML);
        const h5FileData = H5Tpl(title, contentHTML);

        const writeFilePromise = (file, fileData) => {
            return new Promise((resolve, reject) => {
                fs.writeFile(file, fileData, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('success');
                    };
                });
            });
        };
        const pcWriteFile = writeFilePromise(pcFile, pcFileData);
        const h5WriteFile = writeFilePromise(h5File, h5FileData);

        await Promise.all([pcWriteFile, h5WriteFile])
        .then(([pcRes, h5Res]) => {
            if (pcRes === 'success' && h5Res === 'success') {
                ctx.body = {
                    code: 200,
                    success: true
                };
            } else {
                ctx.body = {
                    code: -1,
                    success: false
                };
            }
        })
        .catch(() => {
            ctx.body = {
                code: -1,
                success: false
            };
        });
    }
};
