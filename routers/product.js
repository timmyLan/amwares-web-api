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
    router.get('/getByName', async(ctx) => {
        let { name } = ctx.query;
        try {
            let result = await db.Product.findOne({
                raw: true,
                where: {
                    name: name
                }
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
    router.get('/getById', async(ctx) => {
        let { id } = ctx.query;
        try {
            let result = await db.Product.findById(id, {
                raw: true
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
    router.post('/add/:ClassifyId', upload.fields([
        { name: 'productUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let ClassifyId = ctx.params.ClassifyId;
            let classify = await db.Classify.findById(ClassifyId);
            if (!classify) {
                return ctx.body = {
                    status: 400,
                    data: '没有所属分类,请先创建分类'
                }
            }
            let files = ctx.req.files;
            body = {
                ...body,
                ClassifyId: ClassifyId
            }
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'product');
                await db.Product.create({
                    ...body,
                    productUrl: fileInfo.productUrl
                });
                return ctx.body = {
                    status: 200,
                    data: '添加产品成功'
                }
            } else {
                await db.Product.create(body, {
                    fields: ['name', 'ClassifyId']
                });
                return ctx.body = {
                    status: 200,
                    data: '添加产品成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', upload.fields([
        { name: 'productUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let id = ctx.params.id;
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'product');
                let product = await db.Product.findById(id);
                let productUrl = product.productUrl;
                await db.Product.update({
                    ...body,
                    productUrl: fileInfo.productUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (productUrl && productUrl !== fileInfo.productUrl) {
                    let target = await db.Product.findAndCountAll({
                        where: {
                            productUrl: productUrl
                        },
                        raw: true
                    });
                    if (target.count < 1) {
                        let tmp_path = path.join(__dirname, `../assets${productUrl}`);
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改产品成功'
                }
            } else {
                await db.Product.update(body, {
                    fields: ['name'],
                    where: {
                        id: id
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改产品成功'
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
            let product = await db.Product.findById(id);
            let productUrl = product.productUrl;
            let target = await db.Product.findAndCountAll({
                where: {
                    productUrl: productUrl
                },
                raw: true
            });
            if (target.count <= 1) {
                let tmp_path = path.join(__dirname, `../assets${productUrl}`);
                await removeFile(tmp_path);
            }
            await product.destroy();
            return ctx.body = {
                status: 200,
                data: `删除产品成功`
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.get('/:ClassifyId', async(ctx) => {
        let ClassifyId = ctx.params.ClassifyId;
        let { name, currentPage } = ctx.query;
        let paging = {};
        if (currentPage) {
            paging = definePaging(currentPage);
        }
        try {
            let query = {};
            if (name) {
                query = {
                    name: {
                        $like: `%${name}%`
                    }
                }
            }
            let result = await db.Product.findAndCountAll({
                raw: true,
                where: {
                    ...query,
                    ClassifyId: ClassifyId
                },
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
    return router;
}