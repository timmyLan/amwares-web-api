const router = require('koa-router')();
const loggerError = require('./common.js').loggerError;
const definePaging = require('./common.js').definePaging;

module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let currentPage = ctx.params.currentPage;
            let paging = definePaging(currentPage);
            let result = await db.Visitor.findAndCountAll({
                raw: true,
                ...paging
            });
            return ctx.body = {
                status: 200,
                data: result
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/interval', async(ctx) => {
        try {
            let { cap, floor } = ctx.request.body;
            if (!cap) {
                cap = new Date();
            } else {
                cap = new Date(cap);
            }
            if (!floor) {
                floor = new Date(cap - 24 * 60 * 60 * 1000 * 365);
            } else {
                floor = new Date(floor);
            }
            if (floor > cap) {
                return ctx.body = {
                    status: 400,
                    data: '开始时间不得超过结束时间'
                }
            }
            let result = await db.Visitor.findAll({
                raw: true,
                where: {
                    createdAt: {
                        '$between': [floor, cap]
                    }
                }
            });
            let sub = Math.ceil((cap - floor) / 1000 / 60 / 60 / 24);
            let arr = [];
            arr.length = sub;
            arr.fill(0);
            for (value of result) {
                let createdAt = value.createdAt;
                let createDate = new Date(createdAt);
                let lag = Math.floor((cap - createDate) / 1000 / 60 / 60 / 24);
                let index = sub - 1 - lag;
                arr[index]++;
            }
            return ctx.body = {
                status: 200,
                data: {
                    arr: arr
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/add', async(ctx) => {
        try {
            let body = ctx.request.body;
            const allowValue = [1, 2, 3];
            if (!body.type || allowValue.indexOf(body.type) < 0) {
                return ctx.body = {
                    status: 400,
                    data: '类型必须为1,2,3'
                }
            }
            await db.Visitor.create(body);
            return ctx.body = {
                status: 200,
                data: '添加访问记录成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.get('/device', async(ctx) => {
        try {
            let pc = await db.Visitor.findAndCountAll({
                where: {
                    type: 1
                }
            });
            let phone = await db.Visitor.findAndCountAll({
                where: {
                    type: 2
                }
            });
            let ipad = await db.Visitor.findAndCountAll({
                where: {
                    type: 3
                }
            });
            return ctx.body = {
                status: 200,
                data: {
                    pc: pc.count,
                    phone: phone.count,
                    ipad: ipad.count
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.get('/city', async(ctx) => {
        try {
            let result = await db.Visitor.findAndCountAll({
                raw: true
            });
            let arr = [];
            for (value of result.rows) {
                if (arr[value.city]) {
                    arr[value.city]++;
                } else {
                    arr[value.city] = 1;
                }
            }
            let data = [];
            for (let key in arr) {
                let obj = {};
                obj['name'] = key;
                obj['value'] = arr[key];
                data.push(obj);
            }
            return ctx.body = {
                status: 200,
                data: data
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.get('/count/:ip', async(ctx) => {
        try {
            let ip = ctx.params.ip;
            let result = await db.Visitor.findAndCountAll({
                raw: true,
                where: {
                    ip: ip
                }
            });
            return ctx.body = {
                status: 200,
                data: result.count
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}