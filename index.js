const db = require('./models');
const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
// 认证相关
const bodyParser = require('koa-bodyparser');
const session = require("koa-session2");
const router = require('./routers');
const login_mid = require('./mids/login_mid.js');
// 初始化应用服务
const app = new Koa();
app.use(logger());
//middleware
app.use(require('koa-static')(__dirname + '/assets'));
app.use(session({
    key: "mypassword",
}));
app.use(bodyParser());
app.use(json());
// app.use(login_mid());
app.use(router.routes());
db.sequelize.sync(
    // {
    //     'force': true
    // }
).then(()=> {
    console.log('success to connect mysql~');
});

app.listen(3000,()=>{
  console.log('app listening at 3000');
});