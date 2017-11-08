const router = require('koa-router')();
const loggerError = require('./common.js').loggerError;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.Visitor.findAndCountAll({
                raw: true
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
                    data: '时间上限不得超过时间下限'
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
                    arr: arr,
                    count: sub
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
                // where:{
                    
                // }
            });
            return ctx.body = {
                status: 200,
                data: '添加访问记录成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    return router;
}