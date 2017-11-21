const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
const removeFile = require('./common.js').removeFile;
module.exports = (db) => {
    router.get('/:ProductId/', async(ctx) => {
        let ProductId = ctx.params.ProductId;
        try {
            let result = await db.Content.findAndCountAll({
                raw: true,
                where: {
                    ProductId: ProductId
                },
                order: [
                    ['sort', 'ASC'],
                ]
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
    router.post('/add/:ProductId', upload.fields([
        { name: 'contentUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let ProductId = ctx.params.ProductId;
            let product = await db.Product.findById(ProductId);
            if (!product) {
                return ctx.body = {
                    status: 400,
                    data: '没有所属产品,请先创建产品'
                }
            }
            let max = await db.Content.max('sort');
            let sort;
            if (!max) {
                sort = 1;
            } else {
                sort = ++max;
            }
            body = {
                ...body,
                ProductId: ProductId,
                sort: sort
            }
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'content');
                await db.Content.create({
                    ...body,
                    contentUrl: fileInfo.contentUrl
                });
                return ctx.body = {
                    status: 200,
                    data: '添加内容块成功'
                }
            } else {
                await db.Content.create(body, {
                    fields: ['title', 'description']
                });
                return ctx.body = {
                    status: 200,
                    data: '添加内容块成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', upload.fields([
        { name: 'contentUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let id = ctx.params.id;
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'content');
                let content = await db.Content.findById(id);
                let contentUrl = content.contentUrl;
                await db.Content.update({
                    ...body,
                    contentUrl: fileInfo.contentUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (contentUrl) {
                    let target = await db.Content.findAndCountAll({
                        where: {
                            contentUrl: contentUrl
                        },
                        raw: true
                    });
                    if (target.count < 1) {
                        let tmp_path = path.join(__dirname, `../assets${contentUrl}`);
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改内容块成功'
                }
            } else {
                await db.Product.update(body, {
                    fields: ['title', 'description'],
                    where: {
                        id: id
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改内容块成功'
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
            let content = await db.Content.findById(id);
            let contentUrl = content.contentUrl;
            let target = await db.Content.findAndCountAll({
                where: {
                    contentUrl: contentUrl
                },
                raw: true
            });
            if (target.count <= 1) {
                let tmp_path = path.join(__dirname, `../assets${contentUrl}`);
                await removeFile(tmp_path);
            }
            await content.destroy();
            return ctx.body = {
                status: 200,
                data: `删除内容块成功`
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/change', async(ctx) => {
        try {
            const { change } = ctx.request.body;
            if (!change || !Array.isArray(change)) {
                return ctx.body = {
                    status: 400,
                    data: `顺序交换换参数必须为数组`
                }
            }
            let sort = 1;
            for (id of change) {
                let target = await db.Content.findById(id);
                await target.update({ sort: sort });
                sort++;
            }
            return ctx.body = {
                status: 200,
                body: '顺序交换成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}