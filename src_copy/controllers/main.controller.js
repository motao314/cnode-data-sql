const Controller = require('../controller');

module.exports = class MainController extends Controller {

    async main(ctx, next) {
        // throw an error

        // ctx.throw(401, { code: 1, message: '注册失败' });

        ctx.body = {
            id: 1,
            username: 'zMouse'
        };
    }
}