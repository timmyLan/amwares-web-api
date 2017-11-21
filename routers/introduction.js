const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
const definePaging = require('./common.js').definePaging;
const removeFile = require('./common.js').removeFile;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let currentPage = ctx.params.currentPage;
            let paging = definePaging(currentPage);
            let result = await db.Introduction.findAndCountAll({
                raw: true,
                ...paging
            });
            return ctx.body = {
                status: 200,
                data: result
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/add', upload.fields([
        { name: 'imageUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'introduction');
                await db.Introduction.create({
                    ...body,
                    imageUrl: fileInfo.imageUrl
                });
                return ctx.body = {
                    status: 200,
                    data: '添加公司简闻成功'
                }
            } else {
                await db.Introduction.create(body, {
                    fields: ['description']
                });
                return ctx.body = {
                    status: 200,
                    data: '添加公司简闻成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', upload.fields([
        { name: 'imageUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let id = ctx.params.id;
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'introduction');
                let introduction = await db.Introduction.findById(id);
                let imageUrl = introduction.imageUrl;
                await db.Introduction.update({
                    ...body,
                    imageUrl: fileInfo.imageUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (imageUrl && imageUrl !== fileInfo.imageUrl) {
                    let target = await db.Introduction.findAndCountAll({
                        where: {
                            imageUrl: imageUrl
                        },
                        raw: true
                    });
                    if (target.count < 1) {
                        let tmp_path = path.join(__dirname, `../assets${imageUrl}`);
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改公司简闻成功'
                }
            } else {
                await db.Introduction.update(body, {
                    fields: ['description'],
                    where: {
                        id: id
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改公司简闻成功'
                }
            }

        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }

    });
    router.post('/del/:id', async(ctx) => {
        try {
            const id = ctx.params.id;
            let introduction = await db.Introduction.findById(id);
            let imageUrl = introduction.imageUrl;
            let target = await db.Introduction.findAndCountAll({
                where: {
                    imageUrl: imageUrl
                },
                raw: true
            });
            if (target.count <= 1) {
                let tmp_path = path.join(__dirname, `../assets${imageUrl}`);
                await removeFile(tmp_path);
            }
            await introduction.destroy();
            return ctx.body = {
                status: 200,
                data: `删除公司简闻成功`
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}