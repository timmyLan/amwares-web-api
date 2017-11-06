const router = require('koa-router')();
const path = require('path');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        let result = await db.BaseInfo.findAll({
            raw: true
        });
        return ctx.body = {
            status: 200,
            data: result
        }
    });

    router.post('/edit', upload.fields([
        { name: 'logUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            if (ctx.req.files) {
                let fileInfo = await fileOperation(ctx.req.files);
                await db.BaseInfo.update({
                    ...body,
                    logUrl: fileInfo.logUrl
                }, {
                    where: {
                        id: 1
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改网站基本信息成功'
                }
            } else {
                await db.BaseInfo.update({
                    where: {
                        id: 1
                    },
                    fields: ['name', 'description', 'copyright']
                });
                return ctx.body = {
                    status: 200,
                    data: '修改网站基本信息成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }

    });
    return router;
}