const config = require('../config');
const crypto = require('crypto');

module.exports = (db) => {
    return {
        getUserByUsername: async function(username) {
            let user = await this.getProfile(username, 1);

            return user;
        },

        addUser: async function(username, password) {
            // 密码加密
            const hmac = crypto.createHmac('sha256', config.user.passwordSalt);
            password = hmac.update(password).digest('hex');
            const createdAt = Date.now();

            let sql = '';
            let preparedValues = [];

            sql = "INSERT INTO `users` (`username`, `password`, `created_at`, `last_logined_at`) VALUES (?,?,?,?)";
            preparedValues = [username, password, Date.now(), 0];

            let [{ insertId }] = await db.query(sql, preparedValues);

            return {
                id: insertId,
                username,
                password,
                createdAt
            };
        },

        getProfile: async function(value, type = 0) {
            let sql = '';
            let preparedValues = [];
            let where = '';

            if (type === 0) {
                where = ' WHERE `id`=? ';
            } else {
                where = ' WHERE `username`=? ';
            }

            sql = "SELECT `id`, `username`, `password`, `avatar`, `created_at` as `createdAt`, `last_logined_at` as `lastLoginedAt` FROM `users` " + where;
            preparedValues = [value];
            let [[user]] = await db.query(
                sql,
                preparedValues
            );

            return user;
        },

        patchAvatar: async function(userId, avatar) {
            let sql = '';
            let preparedValues = [];

            sql = "UPDATE `users` SET `avatar` = ? WHERE `id`=?";
            preparedValues = [avatar, userId];
            let [{ affectedRows }] = await db.query(
                sql,
                preparedValues
            );

            return affectedRows;

        },

        getArticles: async function(userId, page = 1, limit = 5) {
            let sql = '';
            let preparedValues = [];
            let where = '';

            where = ' WHERE `articles`.`user_id`=? ';

            sql = "SELECT count(`articles`.`id`) as count FROM `articles` " + where;
            preparedValues = [userId];
            let [[{ count }]] = await db.query(
                sql,
                preparedValues
            );

            // 计算总页数
            let pages = Math.ceil((count / limit));
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`,`articles`.`is_top` as `isTop`, `articles`.`user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` " + where + " ORDER BY `articles`.`id` DESC limit ? offset ?";
            preparedValues = [...preparedValues, limit, offset];
            let [articles] = await db.query(
                sql,
                preparedValues
            );

            return {
                page,
                limit,
                count,
                pages,
                articles
            }
        },

        getReplies: async function(userId, page = 1, limit = 5) {
            let sql = '';
            let preparedValues = [];
            let where = '';

            where = ' WHERE `replies`.`user_id`=? ';

            // 获取当前用户的所有回复所属文章ID
            sql = 'SELECT DISTINCT `article_id` as `articleId` FROM `replies` ' + where;
            preparedValues = [userId];
            let [replies] = await db.query(
                sql,
                preparedValues
            );
            let articleIds = replies.map(reply => reply.articleId).join(',');


            sql = "SELECT count(`id`) as count FROM `articles` WHERE `id` in (" + articleIds + ")";
            preparedValues = [];
            let [[{ count }]] = await db.query(
                sql,
                preparedValues
            );

            // 计算总页数
            let pages = Math.ceil((count / limit));
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            sql = "SELECT `id`, `title`, `user_id` as `userId`, `view_count` as `viewCount`, `reply_count` as `replyCount`, `created_at` as `createdAt` FROM articles  WHERE `id` in (" + articleIds + ") ORDER BY `id` DESC limit ? offset ?";
            preparedValues = [limit, offset];
            let [articles] = await db.query(
                sql,
                preparedValues
            );

            return {
                page,
                limit,
                count,
                pages,
                articles
            };
        }
    }
}
