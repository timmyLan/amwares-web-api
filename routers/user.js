const changePassword = require('./common.js').changePassword;
const router = require('koa-router')();
module.exports = (db) => {
    router.post('/login', async(ctx) => {
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
    });
    router.post('/logout', (ctx) => {
        ctx.session.user = '';
        return ctx.body = {
            status: 200,
            data: '登出成功'
        }
    });
    router.post('/add', async(ctx) => {
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
            password: changePs
        });
        return ctx.body = {
            status: 200,
            data: '添加用户成功'
        }
    });
    router.post('/del/:id', async(ctx) => {
        const id = ctx.params.id;
        let user = await db.User.findById(id);
        if (user.username === ctx.session.user) {
            return ctx.body = {
                status: 400,
                data: '不能删除已登录用户'
            }
        }
        await user.destroy();
        return ctx.body = {
            status: 200,
            data: '删除用户成功'
        }
    });
    router.post('/edit/:id', async(ctx) => {
        const id = ctx.params.id;
        const { password } = ctx.request.body;
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
    });
    router.get('/', async(ctx) => {
        let users = await db.User.findAll({
            'attributes': ['id', 'username'],
            raw: true
        });
        return ctx.body = {
            status: 200,
            data: users
        }
    });
    return router;
}