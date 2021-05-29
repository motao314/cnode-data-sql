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

    let { articleId, page, limit } = ctx.request.query;
    articleId = Number(articleId);
    page = Number(page) || 1;
    limit = Number(limit) || 5;

    const replyService = ctx.state.services.reply;

    let results = await replyService.getReplies(articleId, page, limit);

    ctx.body = results;
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
* @apiSuccess {Number} id 当前回复ID
* @apiSuccess {Number} userId 当前回复用户ID
* @apiSuccess {String} content 回复内容
* @apiSuccess {Number} createdAt 回复时间戳
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 4020
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 4020,
*       "message": "参数错误"
*   }
*/
module.exports.postReply = async (ctx, next) => {

    let {articleId, content} = ctx.request.body;
    articleId = Number(articleId);
    content = (content || '').trim();

    if (!content) {
        ctx.throw(400, {
            code: 4020, message: '参数错误'
        })
    }

    const replyService = ctx.state.services.reply;

    let newReply = await replyService.postReply({
        articleId,
        content,
        userId: ctx.state.user.id
    });

    ctx.body = newReply;
}
