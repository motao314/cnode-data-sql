module.exports.getArticles = async (ctx, next) => {
    let { userId, page, limit } = ctx.request.query;

    userId = Number(userId);

    page = page || 1;
    limit = limit || 5;
    let offset = (page - 1) * limit;

    let where = '';
    let preparedValues = [];
    let sql = '';

    if (userId) {
        where = ' `articles`.`user_id`=?';
        preparedValues.push(userId);
    }

    if (where) {
        where = `WHERE ${where}`;
    }

    sql = "SELECT count(`id`) as count FROM `articles` " + where;
    let [[{ count }]] = await ctx.state.db.query(
        sql, preparedValues
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `id`,`title`,`user_id` as `userId`,`view_count` as `viewCount`,`reply_count` as `replyCount`,`created_at` as `createdAt` FROM `articles` " + where + " limit ? offset ?";
    preparedValues.push(limit, offset);
    let [articles] = await ctx.state.db.query(
        sql,
        preparedValues
    );

    ctx.body = {
        page,
        limit,
        pages,
        articles
    };
}
