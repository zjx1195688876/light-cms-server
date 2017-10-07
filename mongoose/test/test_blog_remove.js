const Blog = require('./test_blog.js');

const removeBlogById = (blogId) => {
    let condition = {'id': blogId};
    Blog.remove(condition).then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

removeBlogById(1);
