const Blog = require('../../models/tplList.js');

const addBlog = () => {
    let blog = new Blog({
        id: 3,
        imgUrl: 'http://themetrace.com/demo/bracket/images/photos/blog1.jpg',
        title: '模板标题3',
        desc: '模板描述3',
        date: new Date()
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
