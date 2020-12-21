const Router = require('koa-router');
const { connection, topicKeys, formatTopicsData } = require("../../config/sql");
const router = new Router();
router.get('/api/reply_topics/:loginname', ctx => {
    const { loginname } = ctx.params;
    let sql = " where `replies`.`loginname` = '" + loginname + "' AND `topics`.`author` <> `replies`.`loginname`";
    const { page = "1", limit = 20 } = ctx.query;
    let start = (Number(page) - 1) * limit;
    let sqlLimit = " LIMIT " + start + "," + limit;
    return new Promise(resolve => {
        const nowSql = "SELECT " + topicKeys + " FROM (`replies` left join `topics` on `replies`.`topic_id` = `topics`.`id`) left join `users` on `topics`.`author` = `users`.`loginname`";
        connection.query(nowSql + sql + sqlLimit, (err, res) => {
            if (err) throw err;
            res = formatTopicsData(res);
            resolve(res);
        })
    }).then((data) => {
        const nowSql = "SELECT COUNT(DISTINCT `topics`.`id`) FROM (`replies` left join `topics` on `replies`.`topic_id` = `topics`.`id`) left join `users` on `topics`.`author` = `users`.`loginname`";
        return new Promise(resolve => {
            connection.query(nowSql + sql, (err, res) => {
                if (err) throw err;
                resolve();
                console.log(res);
                ctx.body = {
                    code: 200,
                    data,
                    len: res[0]["COUNT(DISTINCT `topics`.`id`)"]
                };
            })
        })
    });
});
module.exports = router;
