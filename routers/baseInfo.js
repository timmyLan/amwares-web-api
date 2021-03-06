const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
const removeFile = require('./common.js').removeFile;
const defaultUrl = path.join(__dirname, `../assets/images/baseInfo/pic01.jpg`);
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.BaseInfo.findAll({
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

    router.post('/edit', upload.fields([
        { name: 'logoUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            if (Object.keys(ctx.req.files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'baseInfo');
                let baseInfo = await db.BaseInfo.findOne({
                    where: {
                        id: 1
                    }
                });
                let logoUrl = baseInfo.logoUrl;
                await db.BaseInfo.update({
                    ...body,
                    logoUrl: fileInfo.logoUrl
                }, {
                    where: {
                        id: 1
                    }
                });
                if (logoUrl && logoUrl !== fileInfo.logoUrl) {
                    let tmp_path = path.join(__dirname, `../assets${logoUrl}`);
                    if (tmp_path != defaultUrl) {
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改网站基本信息成功'
                }
            } else {
                await db.BaseInfo.update(body, {
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