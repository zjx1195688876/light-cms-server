const Blog = require('../../models/tplList.js');

const getBlogList = (limit, currentPage, condition = {}) => {
    const sort = {'date': -1};        // 排序（按博客发表时间倒序）
    const skipnum = (currentPage - 1) * limit;   // 跳过数
    Blog.find(condition).skip(skipnum).limit(limit).sort(sort).exec()
    .then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

getBlogList(3, 1);
