const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1', // 填写你的mysql host
    user: 'root', // 填写你的mysql用户名
    password: '', // 填写你的mysql密码
    database: 'cnode'
})
connection.connect(err => {
    if (err) throw err;
    console.log("连接成功")
});
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
module.exports = {
    connection,
    topicKeys,
    formatTopicsData
}
