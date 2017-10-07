const Blog = require('./test_blog.js');

const updateBlogById = (blogId, opts) => {
    let condition = {'id': blogId};
    // update()返回数据处理条数
    // findOneAndUpdate()返回处理后的数据
    // 简单来说，你需要获取数据就用findOneAndUpdate()，只需要修改数据而不关注修改后数据那就用update()。
    Blog.update(condition, opts).then((res) => {
        // 返回为JSON格式，需使用JSON.stringify()
        console.log('res:' + JSON.stringify(res));
    }, (err) => {
        console.log('error:' + err);
    });
};

let opts = {
    id: 1,
    title: '标题01_update',
    author: '作者01_update',
    body: '内容01',
    date: new Date(),
    hidden: false
};

updateBlogById(1, opts);
