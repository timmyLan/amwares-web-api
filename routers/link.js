const router = require('koa-router')();
const loggerError = require('./common.js').loggerError;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.Link.findAll({
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
            await db.Link.create(body);
            return ctx.body = {
                status: 200,
                data: '添加友情链接成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/edit', async(ctx) => {
        try {
            const { linkArr } = ctx.request.body;
            if (!linkArr || !Array.isArray(linkArr)) {
                return ctx.body = {
                    status: 400,
                    data: `修改友情链接参数必须为数组`
                }
            } else {
                for (link of linkArr) {
                    let id = link.id;
                    await db.Link.update(link, {
                        where: {
                            id: id
                        }
                    });
                }
                return ctx.body = {
                    status: 200,
                    data: '修改友情链接成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/del/:id', async(ctx) => {
        try {
            let id = ctx.params.id;
            let link = await db.Link.findById(id);
            await link.destroy();
            return ctx.body = {
                status: 200,
                data: '删除友情链接成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    return router;
}