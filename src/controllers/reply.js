/**
* @api {GET} /replies 获取文章回复列表
* @apiName getReplies
* @apiGroup reply 
* @apiVersion 0.1.0
*
* @apiParam {Number} articleId 文章ID
*
* @apiParam {Number} [page=1] 当前页码数
* @apiParam {Number} [limit=5] 每页显示数据条数
*
* @apiSuccess {Number} page 当前页码数
* @apiSuccess {Number} limit 每页显示数据条数
* @apiSuccess {Number} count 总数据条数
* @apiSuccess {Number} pages 总页码数
* @apiSuccess {Object[]} replies[] 回复数组
* @apiSuccess {Number} replies.id 回复ID 
* @apiSuccess {Number} replies.articleId 被回复文章ID 
* @apiSuccess {Number} replies.userId 回复人ID 
* @apiSuccess {String} replies.content 回复内容 
* @apiSuccess {Number} replies.createdAt 回复时间 
* @apiSuccess {String} replies.username 回复人名称 
* @apiSuccess {String} replies.avatar 回复人头像
*/
module.exports.getReplies = async (ctx, next) => {

    let articleId = ctx.request.query.articleId;

    let { page, limit } = ctx.request.query;
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let offset = (page - 1) * limit;

    let sql = '';
    let preparedValues = [];

    sql = "SELECT count(`id`) as `count` FROM `replies` WHERE `article_id`=?";
    preparedValues = [articleId];
    let [[{ count }]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `replies`.`id` as `id`, `replies`.`article_id` as `articleId`, `replies`.`user_id` as `userId`, `replies`.`content`, `replies`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `replies` LEFT JOIN `users` ON `replies`.`user_id` = `users`.`id` WHERE `article_id` = ? ORDER BY `replies`.`created_at` DESC limit ? offset ?";
    preparedValues = [articleId, limit, offset];
    let [replies] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        page,
        limit,
        pages,
        replies
    };
}


/**
* @api {POST} /reply 提交回复
* @apiName postReply
* @apiGroup reply
* @apiVersion 0.1.0
*
* @apiParam {Number} articleId 文章ID
*
* @apiParam {String} content 回复内容
*
* @apiSuccess {Number} id 回复成功的ID
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 4020
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 4020,
*       "message": "参数错误"
*   }
* @apiErrorExample {json} 4021
*   HTTP/1.1 404 Not Found
*   {
*       "code": 4021,
*       "message": "文章不存在"
*   }
*/
module.exports.postReply = async (ctx, next) => {

    let {articleId, content} = ctx.request.body;

    if (!content) {
        ctx.throw(400, {
            code: 4020, message: '参数错误'
        })
    }

    let sql = '';
    let preparedValues = [];

    // 查询文章是否存在
    sql = "SELECT `id`, `reply_count` as `replyCount` FROM `articles` WHERE `id`=?";
    preparedValues = [articleId];
    let [[article]] = await ctx.state.db.query(
        sql,
        preparedValues
    )

    if (!article) {
        ctx.throw(404, {
            code: 4021, message: '文章不存在'
        })
    }

    sql = "INSERT INTO `replies` (`article_id`, `user_id`, `content`, `created_at`) VALUES (?,?,?,?)";
    preparedValues = [articleId, ctx.state.user.id, content, Date.now()];
    let [{ insertId }] = await ctx.state.db.query(
        sql,
        preparedValues
    )

    // 更新文章reply_count
    let articleReplyCount = article.replyCount + 1;
    sql = "UPDATE `articles` SET `reply_count`=?";
    preparedValues = [articleReplyCount];
    let [{ affectedRows }] = await ctx.state.db.query(
        sql,
        preparedValues
    )

    ctx.body = {
        id: insertId
    };
}
