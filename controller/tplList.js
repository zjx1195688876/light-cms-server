const TplList = require('../models/tplList.js');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async getTotal (ctx) {
        let result = {
            code: -1,
            success: false,
            message: '获取总数错误'
        };
        await TplList.count()
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取总数成功',
                total: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async getTplList (ctx) {
        const { limit, currentPage } = ctx.query;
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = (Number(currentPage) - 1) * limit;   // 跳过数
        let result = {
            code: -1,
            success: false,
            message: '获取模板列表错误'
        };
        await TplList.find({}, opts).skip(skipnum).limit(Number(limit)).sort(sort).exec()
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取模板列表成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async getTplItemById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let result = {
            code: -1,
            success: false,
            message: '获取模板错误'
        };
        await TplList.findOne(conditon, opts).then((res) => {
            ctx.body = {
                code: 200,
                success: true,
                message: '获取模板成功',
                body: res
            };
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    },
    async addOrUpdateTpl (ctx) {
        const { id, imgName, imgUrl, title, desc } = ctx.request.body;
        let tplItem = {
            id,
            imgName,
            imgUrl,
            title,
            desc,
            date: new Date()
        };
        delete tplItem._id;
        let result = {
            code: -1,
            success: false,
            message: '错误'
        };
        // new: true 显示新建的collection的内容，即res
        await TplList.findOneAndUpdate({'id': id}, tplItem, {upsert: true, new: true, setDefaultsOnInsert: true})
        .then(res => {
            ctx.body = {
                code: 200,
                success: true,
                message: '成功',
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
