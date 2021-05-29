const config = require('./config');
const koaBody = require('koa-body');
const auth = require('./middlewares/auth');

const { main } = require('./controllers/main');
const { register, login } = require('./controllers/auth');
const { getProfile: getUserProfile, patchAvatar: patchUserAvatar, getArticles: getUserArticles, getReplies: getUserReplies } = require('./controllers/user');
const { getCategories } = require('./controllers/category');
const { getArticles, getArticle, postArticle, patchArticleViewCount, patchArticleTop } = require('./controllers/article');
const { getReplies, postReply } = require('./controllers/reply');

// const { getUsers: adminGetUsers } = require('./controllers/admin/user');
// const { getArticles: adminGetArticles } = require('./controllers/admin/article');
// const { getReplies: adminGetReplies } = require('./controllers/admin/reply');

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
            getUserProfile
        ]
    },

    {
        method: 'patch',
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
            patchUserAvatar
        ]
    },

    {
        method: 'get',
        url: '/user/articles',
        middlewares: [
            getUserArticles
        ]
    },

    {
        method: 'get',
        url: '/user/replies',
        middlewares: [
            getUserReplies
        ]
    },

    {
        method: 'get',
        url: '/categories',
        middlewares: [
            getCategories
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
        method: 'patch',
        url: '/article/:id(\\d+)/view_count',
        middlewares: [
            patchArticleViewCount
        ]
    },

    {
        method: 'patch',
        url: '/article/:id(\\d+)/top',
        middlewares: [
            koaBody(),
            patchArticleTop
        ]
    },

    {
        method: 'get',
        url: '/replies',
        middlewares: [
            getReplies
        ]
    },
    {
        method: 'post',
        url: '/reply',
        middlewares: [
            auth(),
            koaBody(),
            postReply
        ]
    }

];

const adminRoutes = [
    // {
    //     method: 'get',
    //     url: '/users',
    //     middlewares: [
    //         adminGetUsers
    //     ]
    // },

    // {
    //     method: 'get',
    //     url: '/articles',
    //     middlewares: [
    //         adminGetArticles
    //     ]
    // },
    // {
    //     method: 'get',
    //     url: '/replies',
    //     middlewares: [
    //         adminGetReplies
    //     ]
    // }
]

module.exports = {
    routes,
    adminRoutes
}
