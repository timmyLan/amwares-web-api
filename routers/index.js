const db = require('../models');
// 路由相关
const Router = require('koa-router');
// 初始化路由
const router = new Router();
const user = require('./user.js');
const baseInfo = require('./baseInfo.js');
const slideShow = require('./slideShow.js');
const partner = require('./partner.js');
router.use('/user', user(db).routes());
router.use('/baseInfo', baseInfo(db).routes());
router.use('/slideShow', slideShow(db).routes());
router.use('/partner', partner(db).routes());
module.exports = router;