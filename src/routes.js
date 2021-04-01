const config = require('./config');
const koaBody = require('koa-body');
const auth = require('./middlewares/auth');

const { main } = require('./controllers/main');
const { register, login } = require('./controllers/auth');
const { getProfile, postAvatar } = require('./controllers/user');
const { getArticles, getArticle, postArticle, patchArticleViewCount } = require('./controllers/article');
const { getReplies, postReply } = require('./controllers/reply');

const { getUsers: adminGetUsers } = require('./controllers/admin/user');
const { getArticles: adminGetArticles } = require('./controllers/admin/article');
const { getReplies: adminGetReplies } = require('./controllers/admin/reply');

const routes = [

    {
        method: 'get',
        url: '/',
        middlewares: [
            main
        ]
    },

    {
        method: 'post',
        url: '/auth/register',
        middlewares: [
            koaBody(),
            register
        ]
    },

    {
        method: 'post',
        url: '/auth/login',
        middlewares: [
            koaBody(),
            login
        ]
    },

    {
        method: 'get',
        url: '/user/profile',
        middlewares: [
            auth(),
            koaBody(),
            getProfile
        ]
    },

    {
        method: 'post',
        url: '/user/avatar',
        middlewares: [
            auth(),
            koaBody({
                multipart: true,
                formidable: {
                    uploadDir: config.upload.dir,
                    keepExtensions: true
                }
            }),
            postAvatar
        ]
    },

    {
        method: 'get',
        url: '/articles',
        middlewares: [
            getArticles
        ]
    },

    {
        method: 'get',
        url: '/article/:id',
        middlewares: [
            getArticle
        ]
    },

    {
        method: 'post',
        url: '/article',
        middlewares: [
            auth(),
            koaBody(),
            postArticle
        ]
    },

    {
        method: 'get',
        url: '/article/:id',
        middlewares: [
            patchArticleViewCount
        ]
    },

    {
        method: 'get',
        url: '/replies/:articleId',
        middlewares: [
            getReplies
        ]
    },
    {
        method: 'post',
        url: '/reply/:articleId',
        middlewares: [
            auth(),
            koaBody(),
            postReply
        ]
    }

];

const adminRoutes = [
    {
        method: 'get',
        url: '/users',
        middlewares: [
            adminGetUsers
        ]
    },

    {
        method: 'get',
        url: '/articles',
        middlewares: [
            adminGetArticles
        ]
    },
    {
        method: 'get',
        url: '/replies',
        middlewares: [
            adminGetReplies
        ]
    }
]

module.exports = {
    routes,
    adminRoutes
}