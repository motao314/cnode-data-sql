const Router = require('koa-router');
const { connection,topicKeys,formatTopicsData } = require("../../config/sql");
const router = new Router();
router.get('/api/topics', ctx => {
    const { tab = "all", page = "1", limit = 20 } = ctx.query;
    let sql = "";
    let start = (page - 1) * limit;
    let sqlLimit = " LIMIT " + start + "," + limit;
    switch (tab) {
        case "good":
            sql = " WHERE `good` = " + 1;
            break;
        case "all":
            sql = "";
            break;
        default:
            sql = " WHERE `tab` = '" + tab + "'";
    }
    // 	
    // SELECT `topics`.`*`,`users`.`loginname` FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`
    return new Promise(resolve => {
        const nowSql = "SELECT " + topicKeys + " FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`";
        connection.query(nowSql + sql + sqlLimit, (err, res) => {
            if (err) throw err;
            res = formatTopicsData(res);
            resolve(res);
        })
    }).then((data) => {
        const nowSql = "SELECT COUNT(*) FROM `topics`"
        return new Promise(resolve => {
            connection.query(nowSql + sql, (err, res) => {
                if (err) throw err;
                resolve();
                ctx.body = {
                    code: 200,
                    data,
                    len: res[0][`COUNT(*)`]
                };
            })
        })
    });
});
module.exports = router;
