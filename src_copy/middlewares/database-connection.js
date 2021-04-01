const mysql2 = require('mysql2/promise');
const UserService = require('../services/user.service');
const ArticleService = require('../services/article.service');
const ReplyService = require('../services/reply.service');

module.exports = (config) => {
    return async (ctx, next) => {

        if (!ctx.state.db) {
            try {
                ctx.state.db = await mysql2.createConnection(config);

                ctx.state.services = {
                    user: new UserService(ctx),
                    article: new ArticleService(ctx),
                    reply: new ReplyService(ctx)
                }
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