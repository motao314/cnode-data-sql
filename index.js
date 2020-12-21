const Koa = require('koa');
// const crypto = require("crypto");
// const { resolve } = require('path');
const app = new Koa();
const requireDirectory = require("require-directory");
// const session = require('koa-session');
// app.keys = ['sign'];
// const CONFIG = {
//   key: 'koa.sess',
//   maxAge: 86400000,
//   autoCommit: true,
//   overwrite: true,
//   httpOnly: true,
//   signed: true,
//   rolling: false,
//   renew: false,
//   secure: false,
//   sameSite: null,
// };
// app.use(session(CONFIG, app));
requireDirectory(module,"./api",{
  visit:(router)=>{
    app.use(router.routes());
  }
});

app.listen(3000);
