module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
            ctx.body = {
                code: 0,
                message: '',
                results: ctx.body
            }
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {
                code: err.code,
                message: err.message,
                errors: err.errors
            };
            ctx.app.emit('error', err, ctx);
        }
    }
}