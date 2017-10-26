// const markdown = require('markdown').markdown;
const Login = require('../models/login.js');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

module.exports = {
    async signIn (ctx) {
        const { userName, password } = ctx.request.body;
        const condition = {'userName': userName};
        let result = {
            code: -1,
            success: false,
            message: '登录失败'
        };
        await Login.findOne(condition, opts).then(res => {
            if (password === res.password) {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: '登录成功'
                };
            } else {
                ctx.body = {
                    code: -1,
                    success: false,
                    message: '用户名或密码错误'
                };
            }
        }, err => {
            if (err) {
                result.message = err;
            }
            ctx.body = result;
        });
    }
};
