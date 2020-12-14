const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');
const crypto = require("crypto");
const { resolve } = require('path');
const app = new Koa();
const router = new Router();
const session = require('koa-session');
app.keys = ['sign'];
const CONFIG = {
  key: 'koa.sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: false,
  sameSite: null,
};
//app.use(session(CONFIG, app));
const connection = mysql.createConnection({
  host: '127.0.0.1', // 填写你的mysql host
  user: 'root', // 填写你的mysql用户名
  password: '', // 填写你的mysql密码
  database: 'cnode'
})
connection.connect(err => {
  if (err) throw err;
  console.log("连接成功")
})
router.get('/', ctx => {
  ctx.body = 'Visit index';
});
/*
  获取用户信息：
  /api/user/:loginname
*/
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
/*
  获取文章列表:
  tab（类型）: all(默认值)|good|ask|share
  page(页面): 1-n
  limit(每页多少条): 20(默认值)  
*/
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
  return new Promise(resolve => {
    const nowSql = "SELECT * FROM `topics`";
    connection.query(nowSql + sql + sqlLimit, (err, res) => {
      if (err) throw err;
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
/*
  获取用户发布的文章列表:
  page(页面): 1-n
  limit(每页多少条): 20(默认值)  
*/
router.get('/api/topics/:loginname', ctx => {
  const { loginname } = ctx.params;
  const { page = "1", limit = 20 } = ctx.query;
  let sql = "where `author` = '" + loginname + "'";
  let start = (Number(page) - 1) * limit;
  let sqlLimit = " LIMIT " + start + "," + limit;
  return new Promise(resolve => {
    const nowSql = "SELECT * FROM `topics`";
    connection.query(nowSql + sql + sqlLimit, (err, res) => {
      if (err) throw err;
      resolve(res);
    })
  }).then((data) => {
    const nowSql = "SELECT COUNT(*) FROM `topics`";
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
app.use(router.routes());
app.listen(3000);
