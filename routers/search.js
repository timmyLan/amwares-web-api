const router = require('koa-router')();
module.exports = (db) => {
    router.get('/', async(ctx) => {
        try {
            let { type, content } = ctx.query;
            if (!content) {
                return ctx.body = {
                    status: 400,
                    data: '请填写搜索内容'
                }
            }
            let typeArr = ["1", "2", "3"];
            if (type) {
                if (typeArr.indexOf(type) < 0) {
                    return ctx.body = {
                        status: 400,
                        data: '错误类型'
                    }
                } else if (type === "1") {
                    let result = await db.Classify.findAll({
                        where: {
                            name: {
                                $like: `%${content}%`
                            }
                        },
                        raw: true
                    });
                    let data = [];
                    for (let val of result) {
                        val = {
                            ...val,
                            model: 'classify'
                        }
                        data.push(val);
                    }
                    return ctx.body = {
                        status: 200,
                        data: data
                    }
                } else if (type === "2") {
                    let result = await db.Product.findAll({
                        where: {
                            name: {
                                $like: `%${content}%`
                            }
                        },
                        raw: true
                    });
                    let data = [];
                    for (let val of result) {
                        val = {
                            ...val,
                            model: 'product'
                        }
                        data.push(val);
                    }
                    return ctx.body = {
                        status: 200,
                        data: data
                    }
                } else if (type === "3") {
                    let result = await db.Introduction.findAll({
                        where: {
                            description: {
                                $like: `%${content}%`
                            }
                        },
                        raw: true
                    });
                    let data = [];
                    for (let val of result) {
                        val = {
                            ...val,
                            model: 'introduction'
                        }
                        data.push(val);
                    }
                    return ctx.body = {
                        status: 200,
                        data: data
                    }
                }
            } else {
                let data = [];
                let classify_result = await db.Classify.findAll({
                    where: {
                        name: {
                            $like: `%${content}%`
                        }
                    },
                    raw: true
                });
                for (let val of classify_result) {
                    val = {
                        ...val,
                        model: 'classify'
                    }
                    data.push(val);
                }
                let product_result = await db.Product.findAll({
                    where: {
                        name: {
                            $like: `%${content}%`
                        }
                    },
                    raw: true
                });
                for (let val of product_result) {
                    val = {
                        ...val,
                        model: 'product'
                    }
                    data.push(val);
                }
                let introduction_result = await db.Introduction.findAll({
                    where: {
                        description: {
                            $like: `%${content}%`
                        }
                    },
                    raw: true
                });
                for (let val of introduction_result) {
                    val = {
                        ...val,
                        model: 'introduction'
                    }
                    data.push(val);
                }
                return ctx.body = {
                    status: 200,
                    data: data
                }
            }
        } catch (err) {
            const { method, header, url } = ctx;
            loggerError(`use method:${ctx.method} ${header.host}${url} error:${err}`);
        }
    })
    return router;
}