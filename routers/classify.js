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
            let result = await db.Classify.findOne({
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
            let result = await db.Classify.findById(id, {
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
    router.get('/', async(ctx) => {
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
            let result = await db.Classify.findAndCountAll({
                where: query,
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
        { name: 'classifyUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let files = ctx.req.files;
            if (files) {
                let fileInfo = await fileOperation(ctx.req.files, 'classify');
                await db.Classify.create({
                    ...body,
                    classifyUrl: fileInfo.classifyUrl
                });
                return ctx.body = {
                    status: 200,
                    data: '添加产品分类成功'
                }
            } else {
                await db.Classify.create(body, {
                    fields: ['name', 'description']
                });
                return ctx.body = {
                    status: 200,
                    data: '添加产品分类成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', upload.fields([
        { name: 'classifyUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let id = ctx.params.id;
            let files = ctx.req.files;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'classify');
                let classify = await db.Classify.findById(id);
                let classifyUrl = classify.classifyUrl;
                await db.Classify.update({
                    ...body,
                    classifyUrl: fileInfo.classifyUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (classifyUrl && classifyUrl !== fileInfo.classifyUrl) {
                    let target = await db.Classify.findAndCountAll({
                        where: {
                            classifyUrl: classifyUrl
                        },
                        raw: true
                    });
                    if (target.count < 1) {
                        let tmp_path = path.join(__dirname, `../assets${classifyUrl}`);
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改产品分类成功'
                }
            } else {
                await db.Classify.update(body, {
                    fields: ['name', 'description'],
                    where: {
                        id: id
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改产品分类成功'
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
            let classify = await db.Classify.findById(id);
            let classifyUrl = classify.classifyUrl;
            let target = await db.Classify.findAndCountAll({
                where: {
                    classifyUrl: classifyUrl
                },
                raw: true
            });
            if (target.count <= 1) {
                let tmp_path = path.join(__dirname, `../assets${classifyUrl}`);
                await removeFile(tmp_path);
            }
            await classify.destroy();
            return ctx.body = {
                status: 200,
                data: `删除产品分类成功`
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}