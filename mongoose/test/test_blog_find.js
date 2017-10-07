const Blog = require('./test_blog.js');

const findBlogById = (blogId, opts = {}) => {
    let conditon = {'id': blogId};
    Blog.find(conditon, opts).then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

// 查询结果返回所有字段
findBlogById(1);
// 查询结果只返回title字段
findBlogById(1, {'title': 1});
