const TplList = require('../models/tplList');
const Interceptor = require('../helpers/interceptor');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async getTotal (ctx) {
        let cb = TplList.count();
        await Interceptor(cb, ctx);
    },
    async getTplList (ctx) {
        const { limit, currentPage } = ctx.query;
        const sort = {'date': -1};        // 排序（按时间倒序）
        const skipnum = (Number(currentPage) - 1) * limit;   // 跳过数
        let cb = TplList.find({}, opts).skip(skipnum).limit(Number(limit)).sort(sort).exec();
        await Interceptor(cb, ctx);
    },
    async getTplItemById (ctx) {
        const { id } = ctx.query;
        let conditon = {'id': id};
        let cb = TplList.findOne(conditon, opts);
        await Interceptor(cb, ctx);
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
        // new: true 显示新建的collection的内容，即res
        let cb = TplList.findOneAndUpdate({'id': id}, tplItem, {upsert: true, new: true, setDefaultsOnInsert: true});
        await Interceptor(cb, ctx);
    }
};
