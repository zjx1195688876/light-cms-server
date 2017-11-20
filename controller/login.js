// const markdown = require('markdown').markdown;
const crypto = require('crypto');
const Login = require('../models/login');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

const loginBase = async(ctx, user, type = '') => {
    let condition = {'userName': user.userName};
    let result = {
        code: -1,
        success: false,
        message: '登录失败'
    };
    await Login.findOne(condition, opts).then(res => {
        if (user.password === res.password) {
            if (type === 'FROM_SIGNIN') {
                setCookie(ctx, res);
            }
            ctx.body = {
                code: 200,
                success: true,
                message: '登录成功',
                body: {
                    userName: res.userName
                }
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
};

const setCookie = (ctx, res) => {
    const userInfo = `${res.userName},${res.password}`;
    const cipher = crypto.createCipher('aes192', 'Encrypt user information');
    cipher.update(userInfo);
    var userCookie = cipher.final('hex');
    const now = new Date();
    ctx.cookies.set('user', userCookie, {
        maxAge: 86400000,
        expires: now.setDate(now.getDate() + 10),   // 10天后过期
        overwrite: false
    });
};

const getUserByCookie = (cookie) => {
    let decipher = crypto.createDecipher('aes192', 'Encrypt user information');
    let user = decipher.update(cookie, 'hex', 'utf8');
    user += decipher.final('utf8');
    return user;
};

module.exports = {
    async getUserInfo (ctx) {
        const userCookie = ctx.cookies.get('user');
        if (userCookie) {
            let user = getUserByCookie(userCookie);
            let userName = user.split(',')[0];
            let password = user.split(',')[1];
            await loginBase(ctx, {userName, password});
        } else {
            ctx.body = {
                code: -1,
                success: false,
                message: '无登录信息'
            };
        }
    },
    async signIn (ctx) {
        const { userName, password } = ctx.request.body;
        await loginBase(ctx, {userName, password}, 'FROM_SIGNIN');
    },
    async signOut (ctx) {
        ctx.cookies.set('user', null, {
            maxAge: 0,
            overwrite: true
        });
        ctx.body = {
            code: 200,
            success: true
        };
    }
};
