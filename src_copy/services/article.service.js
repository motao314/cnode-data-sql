const Service = require('../service');

module.exports = class ArticleService extends Service {

    async publish(title, content) {
        title = (typeof title === 'string' ? title : '').trim();
        content = (typeof content === 'string' ? content : '').trim();

        if (!title) {
            this.ctx.throw(400, {
                code: 200101,
                message: '文章标题不能为空'
            });
        };

        if (!content) {
            this.ctx.throw(400, {
                code: 200102,
                message: '文章内容不能为空'
            })
        };

        const datetime = Date.now();
        const [{ insertId: articleId }] = await this.ctx.state.db.query(
            "insert into `article` (`user_id`, `title`, `created_at`, `updated_at`) values (?,?,?,?)",
            [this.ctx.state.user.id, title, datetime, datetime]
        );
        const [{ insertId: articleContentId }] = await this.ctx.state.db.query(
            "insert into `article_content` (`article_id`, `content`) values (?, ?)",
            [articleId, content]
        );

        return {
            id: articleId
        }
    }
}