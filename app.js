const Koa = require('koa');
const routers = require('./routers/index.js');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

// 使用ctx.body解析中间件
app.use(bodyParser());

app.use(cors({
    origin (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
