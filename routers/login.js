const router = require('koa-router')();
const Login = require('../controller/login');

const routers = router
    .post('/signIn', Login.signIn);

module.exports = routers;
