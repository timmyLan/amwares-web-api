module.exports = () => {
    return async(ctx, next) => {
        let user = ctx.session.user;
        let whiteUrls = ['/user/login', '/visitor/add'];
        if (whiteUrls.indexOf(ctx.url) >= 0) {
            await next();
        } else if (ctx.method === 'GET') {
            await next();
        } else {
            if (!user) {
                ctx.body = {
                    status: 400,
                    data: '请先登录!'
                }
            } else {
                await next();
            }
        }
    }
}