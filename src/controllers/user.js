
/**
* @api {GET} /user/profile 获取用户基本信息 
* @apiName getUserProfile
* @apiGroup User
* @apiVersion 0.1.0
*
* @apiParam {Number} [type=0] 获取用户信息的查询字段类型，0=通过id获取，1=通过username获取
* @apiParam {String} value 获取用户信息的查询字段值 
*
* @apiSuccess {Number} id 用户ID
* @apiSuccess {String} username 用户名
* @apiSuccess {String} avatar 头像
* @apiSuccess {Number} createdAt 注册时间 
* @apiSuccess {Number} lastLoginedAt 最后一次时间
* @apiError {Number} code 业务逻辑错误码
* @apiError {String} message 业务逻辑错误描述
* @apiErrorExample {json} 2011
*  HTTP/1.1 404 Not Found
*  {
*      "code": 2011,
*      "message": "用户不存在"
*  }
*/
module.exports.getProfile = async (ctx, next) => {

    let { type, value } = ctx.request.query;
    type = Number(type) || 0;
    value = (value || '').trim();

    let sql = '';
    let preparedValues = [];
    let where = '';

    if (type === 0) {
        where = ' WHERE `id`=? ';
    } else {
        where = ' WHERE `username`=? ';
    }

    sql = "SELECT `id`, `username`, `avatar`, `created_at` as `createdAt`, `last_logined_at` as `lastLoginedAt` FROM `users` " + where;
    preparedValues = [value];
    let [[user]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    if (!user) {
        ctx.throw(404, {
            code: 2011,
            message: '用户不存在'
        });
    }

    ctx.body = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLoginedAt: user.lastLoginedAt
    };
}
/**
* @api {POST} /user/avatar 上传头像 
* @apiName postAvatar
* @apiGroup User
* @apiVersion 0.1.0
* 
* @apiPermission User
*
* @apiHeader (Header) {String} authorization 用户登录授权 token
*
* @apiSuccess {String} name 上传成功后的文件名 
*/
module.exports.postAvatar = async (ctx, next) => {

    let { name } = ctx.request.files.avatar;

    let sql = '';
    let preparedValues = [];

    sql = "UPDATE `users` SET `avatar` = ? WHERE `id`=?";
    preparedValues = [name, ctx.state.user.id];
    let [{ affectedRows }] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = name;
}

/**
* @api {GET} /user/articles 获取指定用户创建的所有文章列表 
* @apiName getArticles
* @apiGroup User
* @apiVersion 0.1.0
*
* @apiParam {Number} userId 用户ID
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
* @apiSuccess {Number} articles.userId 文章所属用户ID
* @apiSuccess {Number} articles.viewCount 文章点击次数
* @apiSuccess {Number} articles.replyCount 文章回复次数
* @apiSuccess {Number} articles.createdAt 文章发表时间
* @apiSuccess {String} articles.username 文章作者名称
* @apiSuccess {String} articles.avatar 文章作者头像
*/
module.exports.getArticles = async (ctx, next) => {

    let { userId, page, limit } = ctx.request.query;
    userId = Number(userId) || 0;
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let offset = (page - 1) * limit;

    let sql = '';
    let preparedValues = [];
    let where = '';

    where = ' WHERE `articles`.`user_id`=? ';

    sql = "SELECT count(`articles`.`id`) as count FROM `articles` " + where;
    preparedValues = [userId];
    let [[{ count }]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`,`articles`.`is_top` as `isTop`, `articles`.`user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` " + where + " ORDER BY `articles`.`id` DESC limit ? offset ?";
    preparedValues = [userId, limit, offset];
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
* @api {GET} /user/replies 获取指定用户参与的所有话题文章列表
* @apiName getReplies 
* @apiGroup User
* @apiVersion 0.1.0
*
* @apiParam {Number} userId 用户ID
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
*/
module.exports.getReplies = async (ctx, next) => {

    let { userId, page, limit } = ctx.request.query;
    userId = Number(userId) || 0;
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let offset = (page - 1) * limit;

    let sql = '';
    let preparedValues = [];
    let where = '';

    where = ' WHERE `replies`.`user_id`=? ';

    // 获取当前用户的所有回复所属文章ID
    sql = 'SELECT DISTINCT `article_id` as `articleId` FROM `replies` ' + where;
    preparedValues = [userId];
    let [replies] = await ctx.state.db.query(
        sql,
        preparedValues
    );
    let articleIds = replies.map(reply => reply.articleId).join(',');

    sql = "SELECT count(`id`) as count FROM `articles` WHERE `id` in (" + articleIds + ")";
    preparedValues = [];
    let [[{ count }]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `id`, `title`, `user_id` as `userId`, `view_count` as `viewCount`, `reply_count` as `replyCount`, `created_at` as `createdAt` FROM articles  WHERE `id` in (" + articleIds + ") ORDER BY `id` DESC limit ? offset ?";
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
        articles
    };
}
