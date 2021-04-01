const Controller = require('../controller');

module.exports = class ArticleController extends Controller {

    /**
     * @api {POST} /article 发布文章
     * @apiName ArticlePublish
     * @apiGroup Article
     * @apiVersion 0.1.0
     * 
     * @apiPermission User
     * 
     * @apiHeader {String} Authorization 授权 token
     * 
     * @apiParam {String} title 文章标题
     * @apiParam {String} content 文章内容
     * 
     * @apiSuccess {Object} result 文章信息
     * @apiSuccess {Number} result.id 文章发布成功后的ID
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
     * @apiErrorExample {json} 200101
     * HTTP/1.1 400 BadRequest
     * {
     *      "code": 200101,
     *      "message": "文章标题不能为空"
     * }
     * @apiErrorExample {json} 200102
     * HTTP/1.1 400 BadRequest
     * {
     *      "code": 200102,
     *      "message": "文章内容不能为空"
     * }
     */
    async publish(ctx) {
        // TODO: 完成发布文章逻辑，待测……
        let { title, content } = ctx.request.body;

        let newArticle = await ctx.state.services.article.publish(title, content);

        ctx.body = newArticle;
    }

    /**
     * @api {GET} /articles 获取所有文章
     * @apiName Articles
     * @apiGroup Article
     * @apiVersion 0.1.0
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
     */
    async getList() {
        // TODO: 完成获取所有文章列表逻辑
    }

    /**
     * @api {GET} /article/:id 获取指定文章的详情
     * @apiName ArticleDetail
     * @apiGroup Article
     * @apiVersion 0.1.0
     * 
     * @apiParam {Number} id 文章ID
     * 
     * @apiSuccess {Number} id 文章ID
     * @apiSuccess {Object} user 文章作者信息
     * @apiSuccess {Number} user.id 文章作者ID
     * @apiSuccess {String} user.username 文章作者名称
     * @apiSuccess {String} user.avatar 文章作者头像
     * @apiSuccess {String} title 文章标题
     * @apiSuccess {Number} replyCount 文章评论数
     * @apiSuccess {Number} viewCount 文章阅读数
     * @apiSuccess {Boolean} isTop 是否为置顶
     * @apiSuccess {Boolean} isGood 是否为精华
     * @apiSuccess {Boolean} isLock 是否为被锁定主题
     * @apiSuccess {Number} createdAt 文章创建时间
     * @apiSuccess {Number} updatedAt 文章更新时间
     * 
     * @apiError {Number} code 业务逻辑错误码
     * @apiError {String} message 业务逻辑错误描述
     */
    async getDetail() {
        // TODO: 完成获取当前文章详情逻辑
    }
}