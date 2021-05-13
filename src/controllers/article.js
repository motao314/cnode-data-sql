/**
* @api {GET} /articles 获取文章列表
* @apiName getArticles
* @apiGroup Article
* @apiVersion 0.1.0
* 
* @apiParam {Number} categoryId 文章分类ID 
* @apiParam {Number} top 是否为置顶文章（1=置顶，0=非置顶，注：与categoryId互斥，且优先级高于categoryId） 
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
* @apiSuccess {Number} articles.categoryId 文章分类ID 
* @apiSuccess {Number} articles.viewCount 文章点击次数
* @apiSuccess {Number} articles.replyCount 文章回复次数 
* @apiSuccess {Number} articles.createdAt 文章发表时间 
* @apiSuccess {String} articles.username 文章作者名称
* @apiSuccess {String} articles.avatar 文章作者头像
* 
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
*/
module.exports.getArticles = async (ctx, next) => {
    let { categoryId, top, page, limit } = ctx.request.query;
    categoryId = Number(categoryId);
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let offset = (page - 1) * limit;

    let sql = '';
    let preparedValues = [];
    let where = '';

    // if (top) {
    //     top = Number(top);
    //     where = ' WHERE `is_top` = ?';
    //     preparedValues = [top];
    // }

    if (categoryId) {
        where = ' WHERE `category_id` = ?';
        preparedValues = [categoryId];
    }

    sql = "SELECT count(`id`) as count FROM `articles` " + where;
    let [[{ count }]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`,`articles`.`is_top` as `isTop`, `user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` " + where + " ORDER BY `articles`.`is_top` DESC, `articles`.`created_at` DESC limit ? offset ?";
    preparedValues = [...preparedValues, limit, offset];
    let [articles] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        page,
        limit,
        count,
        pages,
        articles
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
* @apiSuccess {Number} categoryId 文章分类ID
* @apiSuccess {Number} isTop 是否置顶（1=置顶，0=非置顶）
* @apiSuccess {Number} userId 文章所属用户ID
* @apiSuccess {Number} viewCount 文章点击次数
* @apiSuccess {Number} replyCount 文章回复次数
* @apiSuccess {Number} createdAt 文章发表时间
* @apiSuccess {String} username 文章作者名称
* @apiSuccess {String} avatar 文章作者头像
* @apiSuccess {String} content 文章详情
* 
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 3011
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3011,
*       "message": "文章不存在"
*   }
* @apiErrorExample {json} 3012
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3012,
*       "message": "文章内容不存在"
*   }
*/
module.exports.getArticle = async (ctx, next) => {
    let id = ctx.request.params.id;
    let sql = '';
    let preparedValues = [];


    sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`, `articles`.`is_top` as `isTop`, `articles`.`user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` WHERE `articles`.`id`=?";
    preparedValues = [id];
    let [[article]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!article) {
        ctx.throw(404, {
            code: 3011, message: '文章不存在'
        })
    }

    sql = "SELECT `content` FROM `article_contents` WHERE `article_id`=?";
    let [[articleContent]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!articleContent) {
        ctx.throw(404, {
            code: 3012, message: '文章内容不存在'
        })
    }

    ctx.body = {
        ...article,
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
* @apiHeader (Header) {String} authorization 用户登录授权 token
*
* @apiParam {Number} categoryId 文章分类ID
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
*       "message": "缺少参数"
*   }
*/
module.exports.postArticle = async (ctx, next) => {

    let { categoryId, title, content } = ctx.request.body;

    categoryId = Number(categoryId);
    title = title && title.trim();
    content = content && content.trim();

    let sql = '';
    let preparedValues = [];

    if (!categoryId || !title || !content) {
        ctx.throw(400, {
            code: 3021, message: '缺少参数'
        })
    }

    // 保存文章基本信息
    sql = "INSERT INTO `articles` (`category_id`, `title`,`user_id`,`created_at`) VALUES (?,?,?,?)";
    let createdAt = Date.now();
    preparedValues = [categoryId, title, ctx.state.user.id, createdAt];
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
* @api {PATCH} /article/:id/view_count 更新 viewCount
* @apiName patchArticleViewCount
* @apiGroup Article
* @apiVersion 0.1.0
*
* @apiParam (params) {Number} id 文章ID
*
* @apiSuccess {Number} id 文章
* @apiSuccess {Number} viewCount 文章当前查看总数
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 3031
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3031,
*       "message": "文章不存在"
*   }
*/
module.exports.patchArticleViewCount = async (ctx, next) => {

    let id = ctx.request.params.id;
    let sql = '';
    let preparedValues = [];

    // 查询文章当前view数
    sql = "SELECT `id`,`view_count` as `viewCount` FROM `articles` WHERE `id` = ?";
    preparedValues = [id];
    let [[article]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!article) {
        ctx.throw(404, {
            code: 3031, message: '文章不存在'
        })
    }

    // 更新viewCount
    let viewCount = article.viewCount + 1;
    sql = "UPDATE `articles` SET `view_count` = ?";
    preparedValues = [viewCount];
    let [{ affectedRows }] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        id: article.id,
        viewCount
    }

}


/**
* @api {PATCH} /article/:id/top 置顶设置
* @apiName patchArticleTop
* @apiGroup Article
* @apiVersion 0.1.0
*
* @apiParam (params) {Number} id 文章ID
* @apiParam {Number} isTop 是否置顶（1=置顶，0=取消置顶）
*
* @apiSuccess {Number} id 文章
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 3041
*   HTTP/1.1 400 Bad Request
*   {
*       "code": 3041,
*       "message": "缺少参数"
*   }
* @apiErrorExample {json} 3042
*   HTTP/1.1 404 Not Found
*   {
*       "code": 3042,
*       "message": "文章不存在"
*   }
*/
module.exports.patchArticleTop = async (ctx, next) => {

    let id = ctx.request.params.id;
    let isTop = ctx.request.body.isTop;

    let sql = '';
    let preparedValues = [];

    if (!isTop) {
        ctx.throw(400, {
            code: 3041, message: '缺少参数'
        })
    }
    isTop = !!isTop;

    // 查询文章当前view数
    sql = "SELECT `id` FROM `articles` WHERE `id` = ?";
    preparedValues = [id];
    let [[article]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!article) {
        ctx.throw(404, {
            code: 3042, message: '文章不存在'
        })
    }

    // 置顶设置 
    sql = "UPDATE `articles` SET `is_top` = ?";
    preparedValues = [isTop];
    let [{ affectedRows }] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        id: article.id
    }

}
