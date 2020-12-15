const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');
const crypto = require("crypto");
const { resolve } = require('path');
const app = new Koa();
const router = new Router();
const session = require('koa-session');
const topicKeys = 'DISTINCT `topics`.`id`,`topics`.`tab`,`topics`.`content`,`topics`.`title`,`topics`.`last_reply_at`,`topics`.`good`,`topics`.`top`,`topics`.`reply_count`,`topics`.`visit_count`,`topics`.`create_at`,`users`.`loginname`,`users`.`loginname`,`users`.`avatar_url`';
const formatTopicsData = (data)=>{
  data = data.map(item=>{
    let {loginname,avatar_url} = item;
    delete item.loginname;
    delete item.avatar_url;
    return {
      ...item,
      author: {
        loginname,
        avatar_url
      }
    }
  });
  return data;
};
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
  // SELECT `topics`.`*`,`users`.`loginname` FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`
  return new Promise(resolve => {
    const nowSql = "SELECT "+topicKeys+" FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`";
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
    const nowSql = "SELECT "+topicKeys+" FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`";
    connection.query(nowSql + sql + sqlLimit, (err, res) => {
      if (err) throw err;
      res = formatTopicsData(res);
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
/*
  获取用户参与的主题
*/
router.get('/api/reply_topics/:loginname', ctx => {
  const { loginname } = ctx.params;
  let sql = " where `replies`.`loginname` = '" + loginname + "' AND `topics`.`author` <> `replies`.`loginname`";
  const { page = "1", limit = 20 } = ctx.query;
  let start = (Number(page) - 1) * limit;
  let sqlLimit = " LIMIT " + start + "," + limit;
  return new Promise(resolve => {
    const nowSql = "SELECT "+topicKeys+" FROM (`replies` left join `topics` on `replies`.`topic_id` = `topics`.`id`) left join `users` on `topics`.`author` = `users`.`loginname`";
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
/*
  获取文章详情
*/
router.get('/api/topic/:topic_id', ctx => {
  const { topic_id } = ctx.params;
  let sql = " where `id` = '" + topic_id + "'";
  return new Promise(resolve => {
    const nowSql = "SELECT "+topicKeys+" FROM `topics` left join `users` on `topics`.`author` = `users`.`loginname`";
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
/*
  获取文章评论
*/
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
app.use(router.routes());
app.listen(3000);
