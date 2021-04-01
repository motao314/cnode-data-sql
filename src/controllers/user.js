
/**
 * 获取用户基础信息 
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports.getProfile = async (ctx, next) => {

    let [[user]] = await ctx.state.db.query(
        "SELECT `id`, `username`, `avatar`, `created_at`, `last_logined_at` FROM `users` WHERE `id`=?",
        [ctx.state.user.id]
    );

    ctx.body = user;
}

module.exports.postAvatar = async (ctx, next) => {

    let { name } = ctx.request.files.avatar;

    let [{ affectedRows }] = await ctx.state.db.query(
        "UPDATE `users` SET `avatar` = ? WHERE `id`=?",
        [name, ctx.state.user.id]
    );

    ctx.body = name;
}