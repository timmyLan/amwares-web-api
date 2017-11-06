const router = require('koa-router')();
const loggerError = require('./common.js').loggerError;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        let result = await db.Partner.findAll({
            raw: true
        });
        return ctx.body = {
            status: 200,
            data: result
        }
    });
    router.post('/add', async(ctx) => {
        try {
            let body = ctx.request.body;
            await db.Partner.create(body);
            return ctx.body = {
                status: 200,
                data: '添加合作伙伴成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', async(ctx) => {
        try {
            let body = ctx.request.body;
            let id = ctx.params.id;
            await db.Partner.update(body, {
                where: {
                    id: id
                }
            });
            return ctx.body = {
                status: 200,
                data: '修改合作伙伴成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }

    });
    router.post('/del/:id', async(ctx) => {
        try {
            const id = ctx.params.id;
            let partner = await db.Partner.findById(id);
            await partner.destroy();
            return ctx.body = {
                status: 200,
                data: `删除合作伙伴成功`
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}