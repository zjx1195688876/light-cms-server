const TplItem = require('./tplItem.js');

const getTplList = (limit, currentPage, condition = {}) => {
    const sort = {'date': -1};        // 排序（按时间倒序）
    const skipnum = (currentPage - 1) * limit;   // 跳过数

    TplItem.find(condition).skip(skipnum).limit(limit).sort(sort).exec()
    .then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

getTplList(3, 1);
