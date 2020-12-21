const Router = require('koa-router');
const { connection, formatTopicsData } = require("../../config/sql");
const router = new Router();
router.get('/api/replys/:topic_id', ctx => {
    const { topic_id } = ctx.params;
    let sql = " where `topic_id` = '" + topic_id + "'";
    const { page = "1", limit = 20 } = ctx.query;
    let start = (Number(page) - 1) * limit;
    let sqlLimit = " LIMIT " + start + "," + limit;
    return new Promise(resolve => {
        const nowSql = "SELECT * FROM `replies` left join `users` on `replies`.`loginname` = `users`.`loginname`";
        connection.query(nowSql + sql + sqlLimit, (err, res) => {
            if (err) throw err;
            res = formatTopicsData(res);
            resolve(res);
        })
    }).then((data) => {
        const nowSql = "SELECT COUNT(*) FROM `replies`";
        return new Promise(resolve => {
            connection.query(nowSql + sql, (err, res) => {
                if (err) throw err;
                resolve();
                ctx.body = {
                    code: 200,
                    data,
                    len: res[0]["COUNT(*)"]
                };
            })
        })
    });;
});
module.exports = router;
