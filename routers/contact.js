const path = require('path');
const router = require('koa-router')();
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const loggerError = require('./common.js').loggerError;
const removeFile = require('./common.js').removeFile;
const defaultAvatarUrl = '/images/avatar/avatar.png';
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let result = await db.Contact.findAll({
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
    router.post('/edit', upload.fields([
        { name: 'contactUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let files = ctx.req.files;
            let body = ctx.req.body;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'contact');
                let contact = await db.Contact.findById(1);
                let contactUrl = contact.contactUrl;
                body = {
                    ...body,
                    contactUrl: fileInfo.contactUrl
                }
                await db.Contact.update(body, {
                    where: {
                        id: 1
                    }
                });
                if (contactUrl != defaultAvatarUrl && contactUrl !== fileInfo.contactUrl) {
                    let tmp_path = path.join(__dirname, `../assets${contactUrl}`);
                    await removeFile(tmp_path);
                }
                return ctx.body = {
                    status: 200,
                    data: '修改联系方式成功'
                }
            } else {
                await db.Contact.update(body, {
                    where: {
                        id: 1
                    }
                });
                return ctx.body = {
                    status: 200,
                    data: '修改联系方式成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    return router;
}