module.exports.getUsers = async (ctx, next) => {
    let { page, limit } = ctx.request.query;
    page = page || 1;
    limit = limit || 5;
    let offset = (page - 1) * limit;

    let sql = '';

    sql = "SELECT count(`id`) as count FROM `users`";
    let [[{ count }]] = await ctx.state.db.query(
        sql
    );

    let pages = Math.ceil((count / limit));

    sql = "SELECT `id`,`username`,`avatar`,`is_admin` as `isAdmin`,`created_at` as `createdAt`,`last_logined_at` as `lastLoginedAt` FROM `users` limit ? offset ?";
    let [users] = await ctx.state.db.query(
        sql,
        [limit, offset]
    );

    ctx.body = {
        page,
        limit,
        pages,
        users
    };
}
