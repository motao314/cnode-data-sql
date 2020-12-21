const Router = require('koa-router');
const { connection, topicKeys, formatTopicsData } = require("../../config/sql");
const router = new Router();
router.get('/api/topic/:topic_id', ctx => {
    const { topic_id } = ctx.params;
    let sql = " where `id` = '" + topic_id + "'";
    return new Promise(resolve => {
        const nowSql = "SELECT " + topicKeys + " FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`";
        connection.query(nowSql + sql, (err, res) => {
            if (err) throw err;
            resolve();
            res = formatTopicsData(res)[0];
            ctx.body = {
                code: 200,
                res
            };
        })
    });
});
module.exports = router;
