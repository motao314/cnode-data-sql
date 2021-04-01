module.exports = () => {

    return async (ctx, next) => {
        if (!ctx.state.user || ctx.state.user.id < 1) {
            ctx.throw(401, {
                code: 100000,
                message: '你没有登录'
            });
        }
        await next();
    };
}