const Router = require('koa-router');
const {connection} = require("../../config/sql");
const router = new Router();
router.get('/api/user/:loginname', ctx => {
    const { loginname } = ctx.params;
    return new Promise(resolve => {
        const sql = "SELECT * FROM `users` WHERE `loginname` = '" + loginname + "'";
        connection.query(sql, (err, res) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                res
            }
            resolve();
        })
    })
});

module.exports = router;
