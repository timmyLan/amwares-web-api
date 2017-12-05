const db = require('./models');
const Koa = require('koa');
const cors = require('koa2-cors');
const json = require('koa-json');
const logger = require('koa-logger');
// 认证相关
const bodyParser = require('koa-bodyparser');
const session = require("koa-session2");
const router = require('./routers');
const login_mid = require('./mids/login_mid.js');
// 初始化应用服务
const app = new Koa();
const ENV = process.env.NODE_ENV;
//middleware
app.use(logger());
app.use(cors({
    origin: function(ctx) {
        let requestOrigin = ctx.accept.headers.origin;
        if (ENV === 'development') {
            let whiteReg = /^https?:\/\/localhost:\d+/;
            if (whiteReg.test(requestOrigin)) {
                return requestOrigin;
            } else {
                return false;
            }
        } else if (ENV === 'production') {
            let whiteArray = ['http://ly.admin.com', 'https://ly.admin.com', 'http://ly.website.com', 'https://ly.website.com'];
            if (whiteArray.indexOf(requestOrigin) < 0) {
                return false;
            } else {
                return requestOrigin;
            }
        } else {
            return false;
        }
    },
    credentials: true
}));
app.use(require('koa-static')(__dirname + '/assets'));
app.use(session({
    key: "mypassword",
}));
app.use(bodyParser());
app.use(json());
app.use(login_mid());
app.use(router.routes());
db.sequelize.sync(
    // {
    //     'force': true
    // }
).then(() => {
    console.log('success to connect mysql~');
});

if (ENV === 'development') {
    app.listen(3010, () => {
        console.log('app listening at 3010');
    });
} else if (ENV === 'production') {
    app.listen(3011, () => {
        console.log('app listening at 3011');
    });
} else {
    console.log('error env.');
}