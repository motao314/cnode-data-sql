const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config');


/**
 * @api {POST} /auth/register 用户注册
 * @apiName AuthRegister
 * @apiGroup Auth
 * @apiVersion 0.1.0
 *
 * @apiParam {String} username 登录用户名
 * @apiParam {String} password 登录密码
 * @apiParam {String} repassword 重复密码
 *
 * @apiSuccess {Number} id 用户id
 * @apiSuccess {String} username 用户名
 * @apiSuccess {Number} createdAt 注册时间戳
 *
 * @apiError {Number} code 业务逻辑错误码
 * @apiError {String} message 业务逻辑错误描述
 * @apiErrorExample {json} 1011
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "code": 1011,
 *      "message": "注册用户名和密码不允许为空"
 *  }
 * @apiErrorExample {json} 1012
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "code": 1012,
 *      "message": "两次输入密码不一致"
 *  }
 * @apiErrorExample {json} 1013
 *  HTTP/1.1 409 CONFLICT
 *  {
 *      "code": 1013,
 *      "message": "用户名已经被注册了"
 *  }
 */
module.exports.register = async (ctx, next) => {

    let { username, password, repassword } = ctx.request.body;

    username = username && username.trim();
    password = password && password.trim();

    if (!username || !password) {
        ctx.throw(400, {
            code: 1011, message: '注册用户名和密码不允许为空'
        })
    }

    if (password !== repassword) {
        ctx.throw(400, {
            code: 1012, message: '两次输入密码不一致'
        })
    }

    const userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(username);

    if (user) {
        ctx.throw(409, {
            code: 1013, message: '用户名已经被注册了'
        });
    }

    let newUser = await userService.addUser(username, password);

    ctx.body = {
        id: newUser.id,
        username,
        createdAt: newUser.createdAt
    }
}

/**
* @api {POST} /auth/login 用户登录
* @apiName AuthLogin
* @apiGroup Auth
* @apiVersion 0.1.0
*
* @apiParam {String} username 登录用户名
* @apiParam {String} password 登录密码
*
* @apiSuccess (header) {String} authorization 登录成功后返回token
*
* @apiSuccess {Number} id 用户id
* @apiSuccess {String} username 用户名
* @apiSuccess {String} avatar 用户头像
* @apiSuccess {Number} createdAt 用户注册时间戳 
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 1021
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 1021,
*       "message": "登录用户名和密码不允许为空"
*   }
* @apiErrorExample {json} 1022
*   HTTP/1.1 404 Not Found
*   {
*       "code": 1022,
*       "message": "用户不存在"
*   }
* @apiErrorExample {json} 1023
*   HTTP/1.1 401 Unauthorized
*   {
*       "code": 1023,
*       "message": "密码错误"
*   }
*/
module.exports.login = async (ctx, next) => {

    let { username, password } = ctx.request.body;

    username = username && username.trim();
    password = password && password.trim();

    if (!username || !password) {
        ctx.throw(400, {
            code: 1021, message: '登录用户名和密码不允许为空'
        })
    }

    const userService = ctx.state.services.user;
    let user = await userService.getUserByUsername(username);

    if (!user) {
        ctx.throw(404, {
            code: 1022, message: '用户不存在'
        })
    }

    const hmac = crypto.createHmac('sha256', config.user.passwordSalt);
    password = hmac.update(password).digest('hex');

    if (user.password !== password) {
        ctx.throw(401, {
            code: 1023, message: '密码错误'
        })
    }

    // jwt用户授权
    let token = jsonwebtoken.sign({
        id: user.id,
        username: user.username
    }, config.auth.secretKey);

    ctx.set('Authorization', token);

    ctx.body = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        createdAt: user.createdAt
    }
}
