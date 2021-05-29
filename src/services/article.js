module.exports = (db) => {
    return {
        getArticles: async function(categoryId, page = 1, limit = 5) {
            let sql = '';
            let preparedValues = [];
            let where = '';

            // 查询指定分类的文章
            if (categoryId) {
                where = ' WHERE `category_id` = ?';
                preparedValues = [categoryId];
            }

            // 查询文章总数
            sql = "SELECT count(`id`) as count FROM `articles` " + where;
            let [[{ count }]] = await db.query(
                sql,
                preparedValues
            );

            // 计算总页数
            let pages = Math.ceil((count / limit));
            page = Math.max(1, page);
            page = Math.min(page, pages);
            let offset = (page - 1) * limit;

            sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`,`articles`.`is_top` as `isTop`, `user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` " + where + " ORDER BY `articles`.`is_top` DESC, `articles`.`created_at` DESC limit ? offset ?";
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

        getArticle: async function(id) {
            let sql = '';
            let preparedValues = [];

            sql = "SELECT `articles`.`id`, `articles`.`title`, `articles`.`category_id` as `categoryId`, `articles`.`is_top` as `isTop`, `articles`.`user_id` as `userId`, `articles`.`view_count` as `viewCount`, `articles`.`reply_count` as `replyCount`, `articles`.`created_at` as `createdAt`, `users`.`username` as `username`, `users`.`avatar` as `avatar` FROM `articles` LEFT JOIN `users` ON `articles`.`user_id`=`users`.`id` WHERE `articles`.`id`=?";
            preparedValues = [id];

            let [[article]] = await db.query(
                sql,
                preparedValues
            );

            if (!article) {
                return null;
            }

            sql = "SELECT `content` FROM `article_contents` WHERE `article_id`=?";
            let [[articleContent]] = await db.query(
                sql,
                preparedValues
            );

            return {
                ...article,
                content: articleContent ? articleContent.content : ''
            }
        },

        postArticle: async function(insertData) {
            let {categoryId, title, content, userId} = insertData;
            let sql = '';
            let preparedValues = [];

            // 保存文章基本信息
            sql = "INSERT INTO `articles` (`category_id`, `title`,`user_id`,`created_at`) VALUES (?,?,?,?)";
            let createdAt = Date.now();
            preparedValues = [categoryId, title, userId, createdAt];
            let [{ insertId: articleId }] = await db.query(
                sql,
                preparedValues
            );

            // 保存文章内容
            sql = "INSERT INTO `article_contents` (`article_id`,`content`) VALUES (?,?)";
            preparedValues = [articleId, content];
            let [{ articleContentId }] = await db.query(
                sql,
                preparedValues
            );

            return {
                id: articleId,
                categoryId,
                title,
                content,
                userId,
                createdAt
            }
        },

        patchArticleViewCount: async function(id) {
            let sql = '';
            let preparedValues = [];

            // 查询文章当前view数
            sql = "SELECT `id`,`view_count` as `viewCount` FROM `articles` WHERE `id` = ?";
            preparedValues = [id];
            let [[article]] = await db.query(
                sql,
                preparedValues
            );

            // 更新viewCount
            let viewCount = article.viewCount + 1;
            sql = "UPDATE `articles` SET `view_count` = ?";
            preparedValues = [viewCount];
            let [{ affectedRows }] = await db.query(
                sql,
                preparedValues
            );

            return affectedRows > 0 ? viewCount : 0;
        },

        patchArticleTop: async function(id, isTop) {
            let sql = '';
            let preparedValues = [];

            // 查询文章当前文章的置顶状态
            sql = "SELECT `id`, `is_top` as `isTop` FROM `articles` WHERE `id` = ?";
            preparedValues = [id];
            let [[article]] = await db.query(
                sql,
                preparedValues
            );

            // 置顶设置
            sql = "UPDATE `articles` SET `is_top` = ?";
            preparedValues = [isTop];
            let [{ affectedRows }] = await db.query(
                sql,
                preparedValues
            );

            return affectedRows > 0 ? isTop : article.isTop;
        }
    }
}
