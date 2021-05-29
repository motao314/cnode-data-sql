const mysql2 = require('mysql2/promise');
const getUserService = require('../services/user');
const getCategoryService = require('../services/category');
const getArticleService = require('../services/article');
const getReplyService = require('../services/reply');

let db;
let services;

module.exports = (config) => {
    return async (ctx, next) => {

        if (!db) {
            try {
                db = await mysql2.createConnection(config);

                services = {
                    user: getUserService(db),
                    category: getCategoryService(db),
                    article: getArticleService(db),
                    reply: getReplyService(db),
                }
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
            ctx.state.services = services;
        }
        await next();
    }
}
