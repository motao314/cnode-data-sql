const Koa = require('koa');
const koaCors = require('@koa/cors');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const config = require('./config');
const { routes, adminRoutes } = require('./routes');

const resHandler = require('./middlewares/res-handler');
const databaseConnection = require('./middlewares/database-connection');
const auth = require('./middlewares/auth');
const adminAuth = require('./middlewares/admin-auth');

const app = new Koa();

// cors
app.use(koaCors());

// 静态文件代理
app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true,
}));

// api文档
app.use(koaStaticCache({
    prefix: '/apidoc',
    dir: './apidoc',
    dynamic: true,
    gzip: true
}));

// 数据库链接
app.use(databaseConnection(config.database));

// 路由
const router = new KoaRouter({
    prefix: config.router.prefix
});
const adminRouter = new KoaRouter({
    prefix: config.router.prefix + '/admin'
})

// 绑定路由
routes.map(route => {
    router[route.method](route.url, resHandler(), ...route.middlewares);
});
adminRoutes.map(route => {
    adminRouter[route.method](route.url, resHandler(), auth(), adminAuth(), ...route.middlewares);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(adminRouter.routes());
app.use(adminRouter.allowedMethods());

app.listen(8888);
