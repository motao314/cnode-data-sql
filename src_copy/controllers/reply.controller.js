const Controller = require('../controller');

module.exports = class ReplyController extends Controller {

    /**
     * @api {POST} /reply 提交评论
     * @apiName ReplyPost
     * @apiGroup Reply
     * @apiVersion 0.1.0 
     * 
     * @apiPermission User
     *
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiParam {Number} article_id 评论所属文章ID
     * @apiParam {String} content 评论内容
     *
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     *
     * @apiErrorExample {json} 100200
     * HTTP/1.1 401 Unauthorized
     * {
     *      "code": 100200,
     *      "message": "没有登录"
     * }
     * @apiErrorExample {json} 300101
     * HTTP/1.1 400 BadRequest
     * {
     *      "code": 300101,
     *      "message": "评论所属文章ID不能为空"
     * }
     * @apiErrorExample {json} 300102
     * HTTP/1.1 400 BadRequest
     * {
     *      "code": 300102,
     *      "message": "评论内容不能为空"
     * }
     */
    async post() {
        // TODO: 完成提交评论逻辑
    }

    /**
     * @api {GET} /replies 获取指定文章下的评论列表集合
     * @apiName ReplyList
     * @apiGroup Reply
     * @apiVersion 0.1.0
     * 
     * @apiParam {Number} article_id 评论所属文章ID
     * @apiParam {Number} page=1 评论页码数，默认为 1
     * @apiParam {Number} page_size=10 每页评论数，默认为 10
     * 
     * @apiSuccess {Object[]} results 该文章下的评论集合
     * @apiSuccess {Number} results.id 评论ID
     * @apiSuccess {Number} results.articleId 评论所属文章ID
     * @apiSuccess {String} results.content 评论内容
     * @apiSuccess {Number} results.createdAt 评论时间
     * @apiSuccess {Object} results.user 评论用户信息
     * @apiSuccess {Number} results.user.id 评论用户ID
     * @apiSuccess {String} results.user.username 评论用户名称
     * @apiSuccess {String} results.user.avatar 评论用户头像
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     */
    async getList() {
        // TODO: 完成指定文章下的所有评论逻辑
    }
}