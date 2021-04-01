module.exports.getReplies = async (ctx, next) => {

    let { articleId, userId, page, limit } = ctx.request.query;

    articleId = Number(articleId);
    userId = Number(userId);

    page = page || 1;
    limit = limit || 5;
    let offset = (page - 1) * limit;

    let where = '';
    let preparedValues = [];
    let sql = '';

    if (articleId) {
        where = ' `replies`.`article_id`=?';
        preparedValues.push(articleId);
    }
    if (userId) {
        where += (where ? ' AND' : '') + ' `replies`.`user_id`=?';
        preparedValues.push(userId);
    }

    if (where) {
        where = `WHERE ${where}`;
    }

    sql = "SELECT count(`id`) as count FROM `replies` " + where;
    let [[{ count }]] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    let pages = Math.ceil((count / limit));

    preparedValues.push(limit, offset);
    sql = "SELECT `replies`.`id`,`replies`.`article_id` as `articleId`, `replies`.`user_id` as `userId`, `replies`.`content`, `replies`.`created_at` as `createdAt`, `users`.`username` FROM `replies` left JOIN `users` ON `users`.`id`=`replies`.`user_id` " + where + " limit ? offset ?";
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
