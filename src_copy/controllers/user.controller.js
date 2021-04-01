const Controller = require('../controller');
module.exports = class UserController extends Controller {

    /**
    * @api {POST} /user/login 用户登录
    * @apiName UserLogin 
    * @apiGroup User
    * @apiVersion 0.1.0
    *
    * @apiParam {String} username 登录用户名
    * @apiParam {String} password 登录密码
    *
    * @apiSuccess {String} header<Authorization> 登录成功后的 token
    * @apiSuccess {Number} uid 用户id
    * @apiSuccess {String} username 用户名
    * @apiSuccess {String} email 邮箱
    * 
    * @apiError {Number} code 业务逻辑错误码
    * @apiError {String} message 业务逻辑错误描述
    * @apiErrorExample {json} 100100
    *   HTTP/1.1 400 Bad Request
    *   {
    *       "code": 100100,
    *       "message": "用户名和密码不允许为空"
    *   }
    * @apiErrorExample {json} 100101
    *   HTTP/1.1 401 Unauthorized
    *   {
    *       "code": 100101,
    *       "message": "用户名或密码错误"
    *   }
    */
    async login(ctx) {
        // TODO: 完善用户登录逻辑
        let { username, password } = ctx.request.body;

        let loginUser = await ctx.state.services.user.login(username, password);

        ctx.body = loginUser;
    }

    /**
     * @api {POST} /user/register 用户注册
     * @apiName UserRegister
     * @apiGroup User
     * @apiVersion 0.1.0
     * 
     * @apiParam {String} username 登录用户名
     * @apiParam {String} password 登录密码
     * @apiParam {String} repassword 重复密码
     * 
     * @apiSuccess {Number} uid 用户id
     * @apiSuccess {String} username 用户名
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     * @apiErrorExample {json} 100100
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "code": 100100,
     *      "message": "用户名和密码不允许为空"
     *  }
     * @apiErrorExample {json} 100102
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "code": 100102,
     *      "message": "两次输入密码不一致"
     *  }
     * @apiErrorExample {json} 100103
     *  HTTP/1.1 409 CONFLICT
     *  {
     *      "code": 100103,
     *      "message": "用户名已存在"
     *  }
     */
    async register(ctx) {
        // TODO: 完善用户注册逻辑
        let { username, password, repassword } = ctx.request.body;

        let registerUser = await ctx.state.services.user.register(username, password, repassword);

        ctx.body = registerUser;
    }

    /**
     * @api {POST} /user/logout 用户退出
     * @apiName UserLogout
     * @apiGroup User
     * @apiVersion 0.1.0
     * 
     * @apiPermission User
     * 
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述* 
     * @apiErrorExample {json} 100000
     * HTTP/1.1 401 Unauthorized
     * {
     *      "code": 100000,
     *      "message": "你没有登录"
     * }
     */
    async logout() {
        // TODO: 完善用户退出逻辑
        await ctx.state.services.user.logout();

        ctx.body = '';
    }

    /**
     * @api {GET} /user/profile 获取用户信息
     * @apiName UserProfile
     * @apiGroup User
     * @apiVersion 0.1.0
     * 
     * @apiPermission User
     * 
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiSuccess {Number} id 用户ID
     * @apiSuccess {String} username 用户名
     * @apiSuccess {String} avatar 用户头像地址
     * @apiSuccess {String} signature 用户签名
     * @apiSuccess {Number} createdAt 注册时间
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     * 
     * @apiErrorExample {json} 100000
     * HTTP/1.1 401 Unauthorized
     * {
     *      "code": 100000,
     *      "message": "你没有登录"
     * }
     */
    async getProfile() {
        // TODO: 完成获取用户信息逻辑
    }

    /**
     * @api {GET} /user/articles/published 获取当前用户发布的文章列表
     * @apiName UserArticles
     * @apiGroup User
     * @apiVersion 0.1.0
     * 
     * @apiPermission User
     * 
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiParam {Number} page=1 文章页码数
     * @apiParam {Number} page_size=10 每页文章数
     * 
     * @apiSuccess {Object[]} results 文章列表集合
     * @apiSuccess {Number} results.id 文章ID
     * @apiSuccess {Object} results.user 文章作者信息
     * @apiSuccess {Number} results.user.id 文章作者ID
     * @apiSuccess {String} results.user.username 文章作者名称
     * @apiSuccess {String} results.user.avatar 文章作者头像
     * @apiSuccess {String} results.title 文章标题
     * @apiSuccess {Number} results.replyCount 文章评论数
     * @apiSuccess {Number} results.viewCount 文章阅读数
     * @apiSuccess {Boolean} results.isTop 是否为置顶
     * @apiSuccess {Boolean} results.isGood 是否为精华
     * @apiSuccess {Boolean} results.isLock 是否为被锁定主题
     * @apiSuccess {Number} results.createdAt 文章创建时间
     * @apiSuccess {Number} results.updatedAt 文章更新时间
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     * 
     * @apiErrorExample {json} 100000
     * HTTP/1.1 401 Unauthorized
     * {
     *      "code": 100000,
     *      "message": "你没有登录"
     * }
     */
    async getPublishedArticles() {
        // TODO: 完成当前用户发布的所有文章逻辑
    }

    /**
     * @api {GET} /user/articles/replied 获取当前用户评论的所有的文章列表
     * @apiName UserReplies
     * @apiGroup User
     * @apiVersion 0.1.0
     * 
     * @apiPermission User
     * 
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiParam {Number} page=1 文章页码数
     * @apiParam {Number} page_size=10 每页文章数
     * 
     * @apiSuccess {Object[]} results 文章列表集合
     * @apiSuccess {Number} results.id 文章ID
     * @apiSuccess {Object} results.user 文章作者信息
     * @apiSuccess {Number} results.user.id 文章作者ID
     * @apiSuccess {String} results.user.username 文章作者名称
     * @apiSuccess {String} results.user.avatar 文章作者头像
     * @apiSuccess {String} results.title 文章标题
     * @apiSuccess {Number} results.replyCount 文章评论数
     * @apiSuccess {Number} results.viewCount 文章阅读数
     * @apiSuccess {Boolean} results.isTop 是否为置顶
     * @apiSuccess {Boolean} results.isGood 是否为精华
     * @apiSuccess {Boolean} results.isLock 是否为被锁定主题
     * @apiSuccess {Number} results.createdAt 文章创建时间
     * @apiSuccess {Number} results.updatedAt 文章更新时间
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     * 
     * @apiErrorExample {json} 100000
     * HTTP/1.1 401 Unauthorized
     * {
     *      "code": 100000,
     *      "message": "你没有登录"
     * }
     */
    async getRepliedArticles() {
        // TODO: 完成获取当前用户评论的所有文章逻辑
    }
}


