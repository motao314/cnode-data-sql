const mysql2 = require('mysql2/promise');

module.exports = (config) => {
    return async (ctx, next) => {

        if (!ctx.state.db) {
            try {
                ctx.state.db = await mysql2.createConnection(config);
                // ctx.state.db = {};

            } catch (err) {
                ctx.throw(500, {
                    code: -1,
                    message: '数据库链接失败',
                    errors: err.toString()
                });
            }
        }

        await next();
    }
}