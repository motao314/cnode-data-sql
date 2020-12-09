const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');
const crypto = require("crypto");
const app = new Koa();
const router = new Router();
const connection = mysql.createConnection({
  host: '127.0.0.1', // 填写你的mysql host
  user: 'root', // 填写你的mysql用户名
  password: '', // 填写你的mysql密码
  database: 'cnode'
})
connection.connect(err => {
  if(err) throw err;
})
router.get('/', ctx => {
  ctx.body = 'Visit index';
});
router.get('/api/user/:loginname', ctx => {
    const {loginname} = ctx.params;
    
});

app.use(router.routes());
app.listen(3000);

