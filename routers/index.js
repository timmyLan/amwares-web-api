const db = require('../models');
// 路由相关
const Router = require('koa-router');
// 初始化路由
const router = new Router();
const user = require('./user.js');
const baseInfo = require('./baseInfo.js');
const slideShow = require('./slideshow.js');
const partner = require('./partner.js');
const contact = require('./contact.js');
const advantage = require('./advantage.js');
const link = require('./link.js');
const classify = require('./classify.js');
const product = require('./product.js');
const content = require('./content.js');
const introduction = require('./introduction.js');
const visitor = require('./visitor.js');
router.use('/user', user(db).routes());
router.use('/baseInfo', baseInfo(db).routes());
router.use('/slideShow', slideShow(db).routes());
router.use('/partner', partner(db).routes());
router.use('/contact', contact(db).routes());
router.use('/advantage', advantage(db).routes());
router.use('/link', link(db).routes());
router.use('/classify', classify(db).routes());
router.use('/product', product(db).routes());
router.use('/content', content(db).routes());
router.use('/introduction', introduction(db).routes());
router.use('/visitor', visitor(db).routes());
module.exports = router;