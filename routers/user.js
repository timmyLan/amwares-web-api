const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({ dest: path.join(__dirname, '../assets/images') });
const fileOperation = require('./common.js').fileOperation;
const changePassword = require('./common.js').changePassword;
const removeFile = require('./common.js').removeFile;
const router = require('koa-router')();
const defaultAvatarUrl = '/images/avatar/avatar.png';
module.exports = (db) => {
    router.post('/login', async(ctx) => {
        try {
            const { username, password } = ctx.request.body;
            if (!username) {
                return ctx.body = {
                    status: 400,
                    data: '用户名必须填写'
                };
            }
            if (!password) {
                return ctx.body = {
                    status: 400,
                    data: '密码必须填写'
                };
            }
            let changePs = changePassword(password);
            let result = await db.User.findOne({
                where: {
                    username: username,
                    password: changePs
                },
                raw: true
            });
            if (!result) {
                return ctx.body = {
                    status: 400,
                    data: '用户名或密码错误'
                }
            } else {
                ctx.session.user = username;
                return ctx.body = {
                    status: 200,
                    data: '登录成功'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/logout', (ctx) => {
        try {
            ctx.session.user = '';
            return ctx.body = {
                status: 200,
                data: '登出成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/add', async(ctx) => {
        try {
            const { username, password } = ctx.request.body;
            let changePs = changePassword(password);
            let user = await db.User.findOne({
                where: {
                    username: username
                },
                raw: true
            });
            if (user) {
                return ctx.body = {
                    status: 400,
                    data: '已有用户,请勿重复创建'
                }
            }
            let result = await db.User.create({
                username: username,
                password: changePs,
                avatarUrl: defaultAvatarUrl
            });
            return ctx.body = {
                status: 200,
                data: '添加用户成功'
            }

        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/del/:id', async(ctx) => {
        try {
            const id = ctx.params.id;
            let user = await db.User.findById(id);
            if (user.username === ctx.session.user) {
                return ctx.body = {
                    status: 400,
                    data: '不能删除已登录用户'
                }
            }
            let avatarUrl = user.avatarUrl;
            if (avatarUrl != defaultAvatarUrl) {
                let target = await db.User.findAndCountAll({
                    where: {
                        avatarUrl: avatarUrl
                    },
                    raw: true
                });
                if (target.count <= 1) {
                    let tmp_path = path.join(__dirname, `../assets${avatarUrl}`);
                    await removeFile(tmp_path);
                }
            }
            await user.destroy();
            return ctx.body = {
                status: 200,
                data: '删除用户成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/edit/:id', async(ctx) => {
        try {
            const id = ctx.params.id;
            const { password } = ctx.request.body;
            if(!password){
                return ctx.body = {
                    status: 400,
                    data: '密码必须填写'
                };
            }
            let changePs = changePassword(password);
            let user = await db.User.update({
                password: changePs
            }, {
                where: {
                    id: id
                },
                raw: true
            });
            return ctx.body = {
                status: 200,
                data: '用户修改密码成功'
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    router.post('/edit/avatar/:id', upload.fields([
        { name: 'avatarUrl', maxCount: 1 }
    ]), async(ctx) => {
        try {
            let files = ctx.req.files;
            let id = ctx.params.id;
            if (Object.keys(files).length !== 0) {
                let fileInfo = await fileOperation(ctx.req.files, 'user');
                let user = await db.User.findById(id);
                let avatarUrl = user.avatarUrl;
                await db.User.update({
                    avatarUrl: fileInfo.avatarUrl
                }, {
                    where: {
                        id: id
                    }
                });
                if (avatarUrl && avatarUrl !== fileInfo.avatarUrl) {
                    if (avatarUrl != defaultAvatarUrl) {
                        let target = await db.User.findAndCountAll({
                            where: {
                                avatarUrl: avatarUrl
                            },
                            raw: true
                        });
                        if (target.count < 1) {
                            let tmp_path = path.join(__dirname, `../assets${avatarUrl}`);
                            await removeFile(tmp_path);
                        }
                    }
                }
                return ctx.body = {
                    status: 200,
                    data: '修改头像成功'
                }
            } else {
                return ctx.body = {
                    status: 400,
                    data: '修改头像必须上传图片'
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`)
        }
    });
    router.get('/', async(ctx) => {
        try {
            let users = await db.User.findAll({
                'attributes': ['id', 'username', 'avatarUrl'],
                raw: true
            });
            return ctx.body = {
                status: 200,
                data: users
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    });
    return router;
}