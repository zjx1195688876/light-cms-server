const router = require('koa-router')();
const Login = require('../controller/login');

const routers = router
    .get('/getUserInfo', Login.getUserInfo)
    .post('/signIn', Login.signIn)
    .post('/signOut', Login.signOut);

module.exports = routers;
