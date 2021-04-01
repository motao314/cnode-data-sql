
/**
* @api {GET} /articles 获取文章列表
* @apiName getArticles
* @apiGroup Article
* @apiVersion 0.1.0
* 
* @apiParam {Number} [page=1] 当前页码数
* @apiParam {Number} [limit=5] 每页显示数据条数 
* 
* @apiSuccess {Number} page 当前页码数 
* @apiSuccess {Number} limit 每页显示数据条数 
* @apiSuccess {Number} count 总数据条数 
* @apiSuccess {Number} pages 总页码数 
* @apiSuccess {Object[]} articles[] 文章数组
* @apiSuccess {Number} articles.id 文章ID 
* @apiSuccess {String} articles.title 文章标题 
* @apiSuccess {Number} articles.userId 文章所属用户ID 
* @apiSuccess {Number} articles.viewCount 文章点击次数 
* @apiSuccess {Number} articles.replyCount 文章回复次数 
* @apiSuccess {Number} articles.createdAt 文章发表时间 
* 
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
*/
module.exports.getArticles = async (ctx, next) => {
    // TODO: 全部重新测试一下
    let { page, limit } = ctx.request.query;
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let offset = (page - 1) * limit;

    let sql = '';
    let preparedValues = [];

    sql = "SELECT count(`id`) as count FROM `articles`";
    let [[{ count }]] = await ctx.state.db.query(
        sql
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT * FROM articles limit ? offset ?";
    preparedValues = [limit, offset];
    let [articles] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        page,
        limit,
        count,
        pages,
        articles: articles.map(article => {
            return {
                id: article.id,
                title: article.title,
                userId: article.user_id,
                viewCount: article.view_count,
                replyCount: article.reply_count,
                createdAt: article.created_at
            }
        })
    };
}

/**
* @api {GET} /article/:id 获取文章详情
* @apiName getArticle
* @apiGroup Article
* @apiVersion 0.1.0
*
* @apiParam (params) {Number} id 文章ID
*
* @apiSuccess {Number} id 文章ID
* @apiSuccess {String} title 文章标题
* @apiSuccess {Number} userId 文章所属用户ID
* @apiSuccess {Number} viewCount 文章点击次数
* @apiSuccess {Number} replyCount 文章回复次数
* @apiSuccess {Number} createdAt 文章发表时间
* 
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 3011
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 1021,
*       "message": "缺少文章ID参数"
*   }
* @apiErrorExample {json} 3012
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3012,
*       "message": "文章不存在"
*   }
* @apiErrorExample {json} 3013
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3013,
*       "message": "文章内容不存在"
*   }
*/
module.exports.getArticle = async (ctx, next) => {
    let id = ctx.request.params.id;
    let sql = '';
    let preparedValues = [];

    if (!id) {
        ctx.throw(400, {
            code: 3011, message: '缺少文章ID参数'
        })
    }

    sql = "SELECT * FROM `articles` WHERE `id`=?";
    preparedValues = [id];
    let [[article]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!article) {
        ctx.throw(404, {
            code: 3012, message: '文章不存在'
        })
    }

    sql = "SELECT * FROM `article_contents` WHERE `article_id`=?";
    let [[articleContent]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!articleContent) {
        ctx.throw(404, {
            code: 3013, message: '文章内容不存在'
        })
    }

    ctx.body = {
        id: article.id,
        title: article.title,
        userId: article.user_id,
        viewCount: article.view_count,
        replyCount: article.reply_count,
        createdAt: article.created_at,
        content: articleContent.content
    };
}

/**
* @api {POST} /article 发布文章
* @apiName postArticle
* @apiGroup Article
* @apiVersion 0.1.0
*
* @apiPermission User
*
* @apiHeader (Header) {String} authorization Authorization value.
*
* @apiParam {String} title 文章标题
* @apiParam {String} content 文章内容
*
* @apiSuccess {Number} id 添加成功后的文章ID
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 3021
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 3021,
*       "message": "文章标题和内容不能为空"
*   }
*/
module.exports.postArticle = async (ctx, next) => {

    let { title, content } = ctx.request.body;
    let sql = '';
    let preparedValues = [];

    if (!title || !content) {
        ctx.throw(400, {
            code: 3021, message: '文章标题和内容不能为空'
        })
    }

    // 保存文章基本信息
    sql = "INSERT INTO `articles` (`title`,`user_id`,`created_at`) VALUES (?,?,?)";
    preparedValues = [title, ctx.state.user.id, Date.now()];
    let [{ insertId: articleId }] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    // 保存文章内容
    sql = "INSERT INTO `article_contents` (`article_id`,`content`) VALUES (?,?)";
    preparedValues = [articleId, content];
    let [{ articleContentId }] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        id: articleId
    }
}


/**
 * 更新view count
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.patchArticleViewCount = async (ctx, next) => {

    let id = ctx.request.params.id;

    // 查询文章当前view数
    let [[article]] = await ctx.state.db.query(
        "SELECT `id`,`view_count` FROM `articles` WHERE `id` = ?",
        [id]
    );

    if (!article) {
        ctx.throw(404, {
            code: 3031, message: '文章不存在'
        })
    }

    // 更新viewCount
    let viewCount = article.view_count + 1;
    let [{ affectedRows }] = await ctx.state.db.query(
        "UPDATE `articles` SET `view_count` = ?",
        [viewCount]
    );

    ctx.body = {
        id: article.id,
        viewCount
    }

}