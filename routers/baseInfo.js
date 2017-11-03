const router = require('koa-router')();
const path = require('path');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
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

    router.post('/edit', upload.single('logUrl'), async(ctx) => {
        let body = ctx.req.body;
        if (ctx.req.file) {
            let logUrl = await fileOperation(ctx.req.file);
            await db.BaseInfo.update({
                ...body,
                logUrl: logUrl
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
    });
    return router;
}