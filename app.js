const Koa = require('koa');
const routers = require('./routers/index');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const serve = require('koa-static');
// const session = require('koa-session');
const config = require('./config');

// app.use(session(config.session, app));

app.use(serve(
    path.join(__dirname, './static')
));

// 使用ctx.body解析中间件
app.use(bodyParser());

// 支持跨域
app.use(cors({
    origin (ctx) {
        return config.origin;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
