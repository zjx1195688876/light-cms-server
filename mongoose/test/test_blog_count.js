const Blog = require('./test_blog.js');

const getCountByCondition = (condition) => {
    Blog.count(condition).then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

getCountByCondition({'title': '标题'});
// 通过正则模糊匹配
getCountByCondition({'title': {$regex: /标题/i}});
