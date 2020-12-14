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
app.use(session(CONFIG, app));
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
    return new Promise(resolve=>{
      const sql = "SELECT * FROM `users` WHERE `loginname` = '"+loginname+"'";
      connection.query(sql,(err,res)=>{
        if(err) throw err;
        resolve(res[0]);
      })
    }).then((info)=>{
        const sql = "SELECT * FROM `topics` WHERE `author` = '"+loginname+"'";
        return new Promise(resolve=>{
          connection.query(sql,(err,res)=>{
            if(err) throw err;
            info["topics"] = res;
            resolve(info);
          })  
        });
    }).then((info)=>{
      const sql = "SELECT * FROM `replies` WHERE `loginname` = '"+loginname+"'";
      return new Promise(resolve=>{
        connection.query(sql,(err,res)=>{
          if(err) throw err;
          //console.log(res);
          const replies_topic = [...(new Set(res.map(item=>item.topic_id)))];
         // console.log(replies_topic);
          ctx.body = replies_topic;
          resolve();
        })  
      });
  })
});
router.get('/api/topics', ctx => {
  const sql = "SELECT * FROM `topics` WHERE `author` = '"+loginname+"'";
      return new Promise(resolve=>{
        connection.query(sql,(err,res)=>{
          if(err) throw err;
          
          resolve();
        })  
      });
  })
app.use(router.routes());
app.listen(3000);

