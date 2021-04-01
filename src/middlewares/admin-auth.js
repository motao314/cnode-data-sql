
module.exports = () => {

    return async (ctx, next) => {
        if (!ctx.state.user.isAdmin) {
            ctx.throw(401, {
                code: -2,
                message: '你没有权限'
            });
        }
        await next();
    };
}