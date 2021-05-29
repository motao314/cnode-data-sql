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
* @apiSuccess {Number} articles.isTop 是否置顶（1=置顶，0=非置顶）
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
    let { categoryId, page, limit } = ctx.request.query;
    categoryId = Number(categoryId);
    page = Number(page) || 1;
    limit = Number(limit) || 5;

    const articleService = ctx.state.services.article;

    let results = await articleService.getArticles(categoryId, page, limit);

    ctx.body = results;
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
*/
module.exports.getArticle = async (ctx, next) => {
    let id = Number(ctx.request.params.id);

    const articleService = ctx.state.services.article;

    let article = await articleService.getArticle(id);

    if (!article) {
        ctx.throw(404, {
            code: 3011, message: '文章不存在'
        })
    }

    ctx.body = article;
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
* @apiSuccess {Number} categoryId 文章所属分类ID
* @apiSuccess {String} title 文章标题
* @apiSuccess {String} content 文章内容
* @apiSuccess {Number} userId 添加作者id
* @apiSuccess {Number} createdAt 文章添加时间戳
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

    if (!categoryId || !title || !content) {
        ctx.throw(400, {
            code: 3021, message: '缺少参数'
        })
    }

    const articleService = ctx.state.services.article;

    let newArticle = await articleService.postArticle({
        categoryId,
        title,
        content,
        userId: ctx.state.user.id
    });

    ctx.body = newArticle;
}


/**
* @api {PATCH} /article/:id/view_count 更新 viewCount
* @apiName patchArticleViewCount
* @apiGroup Article
* @apiVersion 0.1.0
*
* @apiParam (params) {Number} id 文章ID
*
* @apiSuccess {Number} viewCount 文章当前查看总数
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
*/
module.exports.patchArticleViewCount = async (ctx, next) => {

    let id = Number(ctx.request.params.id);

    const articleService = ctx.state.services.article;

    let viewCount = await articleService.patchArticleViewCount(id);

    ctx.body = {
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
* @apiSuccess {Number} isTop 当前置顶状态
*
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
*/
module.exports.patchArticleTop = async (ctx, next) => {

    let id = Number(ctx.request.params.id);
    let isTop = !!ctx.request.body.isTop;

    const articleService = ctx.state.services.article;

    let newIsTop = articleService.patchArticleTop(id, isTop);

    ctx.body = {
        isTop: newIsTop
    }

}
