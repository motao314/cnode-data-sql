const Koa = require('koa');
// const crypto = require("crypto");
// const { resolve } = require('path');
const app = new Koa();
const requireDirectory = require("require-directory");
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
requireDirectory(module,"./api",{
  visit:(router)=>{
    app.use(router.routes());
  }
});
app.use(session(CONFIG, app));
app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;
  //console.log(ctx.session);
  //ctx.body = ctx.session;
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
  
});

app.listen(3000);
