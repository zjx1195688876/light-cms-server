const Blog = require('./test_blog.js');

const addBlog = () => {
    let blog = new Blog({
        id: 1,
        title: '标题01',
        author: '作者01',
        body: '内容01',
        date: new Date(),
        hidden: false
    });

    /* blog.save((err, res) => {
        if (err) {
            console.log('error:' + err);
        } else {
            console.log('res:' + res);
        }
    }); */

    blog.save().then((res) => {
        console.log('res:' + res);
    }, (err) => {
        console.log('error:' + err);
    });
};

addBlog();
