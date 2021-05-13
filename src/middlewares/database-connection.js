const mysql2 = require('mysql2/promise');
let db;

module.exports = (config) => {
    return async (ctx, next) => {

        if (!db) {
            try {
                db = await mysql2.createConnection(config);
            } catch (err) {
                ctx.throw(500, {
                    code: -1,
                    message: '数据库链接失败',
                    errors: err.toString()
                });
            }
        }
        if (db) {
            ctx.state.db = db;
        }
        await next();
    }
}