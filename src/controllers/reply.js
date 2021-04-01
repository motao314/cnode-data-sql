/**
 * 获取回复文章列表
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.getReplies = async (ctx, next) => {

    let articleId = ctx.request.params.articleId;

    let { page, limit } = ctx.request.query;
    page = page || 1;
    limit = limit || 5;
    let offset = (page - 1) * limit;

    let [[{ count }]] = await ctx.state.db.query(
        "SELECT count(`id`) as count FROM `replies` WHERE `article_id`=?",
        [articleId]
    );

    let pages = Math.ceil((count / limit));

    let [replies] = await ctx.state.db.query(
        "SELECT * FROM `replies` WHERE `article_id` = ? limit ? offset ?",
        [articleId, limit, offset]
    );

    ctx.body = {
        page,
        limit,
        pages,
        replies
    };
}


/**
 * 提交回复 
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.postReply = async (ctx, next) => {

    let articleId = ctx.request.params.articleId;

    let content = ctx.request.body.content;

    if (!content) {
        ctx.throw(400, {
            code: 4020, message: '回复内容不能为空'
        })
    }

    // 查询文章是否存在
    let [[article]] = await ctx.state.db.query(
        "SELECT `id`, `reply_count` FROM `articles` WHERE `id`=?",
        [articleId]
    )

    if (!article) {
        ctx.throw(404, {
            code: 4021, message: '文章不存在'
        })
    }

    let [{ insertId }] = await ctx.state.db.query(
        "INSERT INTO `replies` (`article_id`, `user_id`, `content`, `created_at`) VALUES (?,?,?,?)",
        [articleId, ctx.state.user.id, content, Date.now()]
    )

    // 更新文章reply_count
    let articleReplyCount = article.reply_count + 1;
    let [{ affectedRows }] = await ctx.state.db.query(
        "UPDATE `articles` SET `reply_count`=?",
        [articleReplyCount]
    )

    ctx.body = {
        id: insertId
    };
}