const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');

module.exports = () => {

    return async (ctx, next) => {
        try {
            let user = jsonwebtoken.verify(ctx.headers.authorization, config.auth.secretKey);
            ctx.state.user = user;
        } catch (err) {
            ctx.throw(401, {
                code: -1,
                message: '你没有登录'
            });
        }

        await next();
    };
}