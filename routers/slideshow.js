const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
const removeFile = require('./common.js').removeFile;
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.SlideShow.findAll({
                order: [
                    ['sort', 'ASC'],
                ],
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
    router.post('/add', upload.fields([
        { name: 'slideshowUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let max = await db.SlideShow.max('sort');
            let sort;
            if (!max) {
                sort = 1;
            } else {
                sort = ++max;
            }
            body = { ...body, sort: sort };
            let files = ctx.req.files;
            if (files) {
                let fileInfo = await fileOperation(ctx.req.files, 'slideShow');
                await db.SlideShow.create({
                    ...body,
                    slideshowUrl: fileInfo.slideshowUrl
                });
                return ctx.body = {
                    status: 200,
                    data: '添加轮播图成功'
                }
            } else {
                await db.SlideShow.create(body, {
                    fields: ['title', 'description', 'link', 'sort']
                });
                return ctx.body = {
                    status: 200,
                    data: '添加轮播图成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.post('/edit/:id', upload.fields([
        { name: 'slideshowUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let body = ctx.req.body;
            let id = ctx.params.id;
            let files = ctx.req.files;
            if (files) {
                let fileInfo = await fileOperation(ctx.req.files, 'slideShow');
                let slideShow = await db.SlideShow.findById(id);
                let slideshowUrl = slideShow.slideshowUrl;
                await db.SlideShow.update({
                    ...body,
                    slideshowUrl: fileInfo.slideshowUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (slideshowUrl) {
                    let target = await db.SlideShow.findAndCountAll({
                        where: {
                            slideshowUrl: slideshowUrl
                        },
                        raw: true
                    });
                    if (target.count < 1) {
                        let tmp_path = path.join(__dirname, `../assets${slideshowUrl}`);
                        await removeFile(tmp_path);
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改轮播图成功'
                }
            } else {
                await db.SlideShow.update(body, {
                    fields: ['title', 'description', 'link'],
                    where: {
                        id: id
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改轮播图成功'
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
            let slideShow = await db.SlideShow.findById(id);
            let slideshowUrl = slideShow.slideshowUrl;
            if (slideshowUrl) {
                let target = await db.SlideShow.findAndCountAll({
                    where: {
                        slideshowUrl: slideshowUrl
                    },
                    raw: true
                });
                if (target.count <= 1) {
                    let tmp_path = path.join(__dirname, `../assets${slideshowUrl}`);
                    await removeFile(tmp_path);
                }

            }
            await slideShow.destroy();
            return ctx.body = {
                status: 200,
                data: `删除轮播图成功`
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
                    data: `顺序交换参数必须为数组`
                }
            }
            let sort = 1;
            for (id of change) {
                let target = await db.SlideShow.findById(id);
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