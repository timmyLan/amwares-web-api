const router = require('koa-router')();
const loggerError = require('./common.js').loggerError;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.Advantage.findAll({
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
    router.post('/add', async(ctx) => {
        try {
            let body = ctx.request.body;
            await db.Advantage.create(body);
            return ctx.body = {
                status: 200,
                data: '添加我们的优势成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/edit/:id', async(ctx) => {
        try {
            const body = ctx.request.body;
            const id = ctx.params.id;
            await db.Advantage.update(body,{
                where:{
                    id:id
                }
            })
            return ctx.body = {
                status: 200,
                data: '修改我们的优势成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/del/:id', async(ctx) => {
        try {
            let id = ctx.params.id;
            let advantage = await db.Advantage.findById(id);
            await advantage.destroy();
            return ctx.body = {
                status: 200,
                data: '删除我们的优势成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    return router;
}