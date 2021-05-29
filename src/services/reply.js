module.exports = (db) => {

    return {
        getReplies: async function(articleId, page = 1, limit = 5) {
            let sql = '';
            let preparedValues = [];
            let where = '';

            where = ' WHERE `article_id`=?';

            sql = "SELECT count(`id`) as `count` FROM `replies` " + where;
            console.log('preparedValues', articleId);
            preparedValues = [articleId];
            let [[{ count }]] = await db.query(
                sql,
                preparedValues
            );

            // 计算总页数
            let pages = Math.ceil((count / limit));
            pages = Math.max(pages, 1);
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            sql = "SELECT `replies`.`id` as `id`, `replies`.`article_id` as `articleId`, `replies`.`user_id` as `userId`, `replies`.`content`, `replies`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `replies` LEFT JOIN `users` ON `replies`.`user_id` = `users`.`id` " + where + " ORDER BY `replies`.`created_at` DESC limit ? offset ?";
            preparedValues = [...preparedValues, limit, offset];
            let [replies] = await db.query(
                sql,
                preparedValues
            );

            return {
                page,
                limit,
                count,
                pages,
                replies
            }
        },

        postReply: async function(insertData) {
            let {articleId, content, userId} = insertData;
            let sql = '';
            let preparedValues = [];

            let createdAt = Date.now();
            sql = "INSERT INTO `replies` (`article_id`, `user_id`, `content`, `created_at`) VALUES (?,?,?,?)";
            preparedValues = [articleId, userId, content, Date.now()];
            let [{ insertId: replyId }] = await db.query(
                sql,
                preparedValues
            )

            // 更新文章reply_count
            sql = "SELECT `id`, `reply_count` as `replyCount` FROM `articles` WHERE `id`=?";
            preparedValues = [articleId];
            let [[article]] = await db.query(
                sql,
                preparedValues
            )
            let articleReplyCount = article.replyCount + 1;
            sql = "UPDATE `articles` SET `reply_count`=?";
            preparedValues = [articleReplyCount];
            let [{ affectedRows }] = await db.query(
                sql,
                preparedValues
            )

            return {
                id: replyId,
                userId,
                content,
                createdAt
            }
        }
    }
}
