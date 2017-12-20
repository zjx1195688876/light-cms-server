const crypto = require('crypto');
// const request = require('koa2-request');
const request = require('request');
const iconv = require('iconv-lite');
const Login = require('../models/login');
const opts = {  // 返回给前台的结果中不包含数据库特有的_id和__v
    '_id': 0,
    '__v': 0
};

const loginBase = async(ctx, user, type = '') => {
    let condition = {'username': user.username};
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
                    username: res.username
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

// const logoutBase = (ctx) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, 0);
//     });
// };

// const relay = async() => {
//     return await timeout(0);
// };

// const timeout = async(delay) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const obj = {
//                 code: 200,
//                 success: true
//             };
//             resolve(obj);
//         }, delay);
//     });
// };

const CASLogin = (ticket, service, serviceKey) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('random');
        }, delay);
    });
};

const setCookie = (ctx, res) => {
    const userInfo = `${res.username},${res.password}`;
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
            let username = user.split(',')[0];
            let password = user.split(',')[1];
            await loginBase(ctx, {username, password});
        } else {
            ctx.body = {
                code: -1,
                success: false,
                message: '无登录信息'
            };
        }
    },
    async signIn (ctx) {
        const { username, password } = ctx.request.body;
        await loginBase(ctx, {username, password}, 'FROM_SIGNIN');
    },
    signOut (ctx) {
        // const token = await relay();
        // ctx.cookies.set('user', '', {
        //     maxAge: 0,
        //     overwrite: true
        // });
        // ctx.body = token;
        // ctx.body = {
        //     code: 200,
        //     success: true
        // };

        // await next();
        // logoutBase().then(res => {
        ctx.cookies.set('user', '', {
            maxAge: 0,
            overwrite: true
        });
        ctx.body = {
            code: 200,
            success: true
        };
        // });
    }
};
