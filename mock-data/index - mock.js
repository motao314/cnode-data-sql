const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');
const crypto = require("crypto");
const {rootData} = require("./rootData");
const {usersData} = require("./userData");
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
  console.log('mysql connncted success!');
})

router.get('/', ctx => {
  ctx.body = 'Visit index';
});
router.get("/adduser",ctx =>{
  return new Promise(resolve=>{
    const sql = `INSERT INTO users(loginname,avatar_url,create_at,score,github_username,password) VALUES ?`;
    const values = [];
    usersData.forEach(item=>{
      let val = Object.values(item);
      let md5 = crypto.createHash("md5");
      let newPas = md5.update("123456").digest("hex")
      val.push(newPas + "");
      values.push(val);
    }) 
    connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `insert ${result.affectedRows} data to fe_frame success!`        
      }
      resolve();
    })
  });
});
router.get("/addtopics",ctx =>{
  return new Promise(resolve=>{	
    const sql = `INSERT INTO topics(tab,content,title,last_reply_at,good,top,reply_count,visit_count,create_at,author) VALUES ?`;
    const values = [];
    rootData.forEach(item=>{
      let val = [item["tab"],item["content"],item["title"],item["last_reply_at"],item["good"]?1:0,item["top"]?1:0,item["reply_count"],item["visit_count"],item["create_at"],item["author"].loginname];
      values.push(val);
    });
    connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `insert ${result.affectedRows} data to fe_frame success!`        
      }
      resolve();
    })
  });
});
router.get("/addreplies",ctx =>{
  return new Promise(resolve=>{
    const sql = `INSERT INTO replies(topic_id,loginname,content,create_at	) VALUES ?`;
    const values = [];
    rootData.forEach((item,index)=>{
      item.replies.forEach(replie=>{
        let val = [index,replie.author.loginname,replie.content,replie.create_at];
        values.push(val);
      });
    });
    connection.query(sql, [values], (err, result) => {
      if (err) throw err;
      ctx.body = {
        code: 200,
        msg: `insert ${result.affectedRows} data to fe_frame success!`        
      }
      resolve();
    })
  });
});
app.use(router.routes());
app.listen(3000);

