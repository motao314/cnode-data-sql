const koaBody = require('koa-body');

const auth = require('./middlewares/auth');

const MainController = require('./controllers/main.controller');
const UserController = require('./controllers/user.controller');
const ArticleController = require('./controllers/article.controller');
const ReplyController = require('./controllers/reply.controller');

const mainController = new MainController();
const userController = new UserController();
const articleController = new ArticleController();
const replyController = new ReplyController();

const routes = [
    {
        method: 'get',
        url: '/',
        middlewares: [
            mainController.main.bind(mainController)
        ]
    },

    {
        method: 'post',
        url: '/user/register',
        middlewares: [
            koaBody(),
            userController.register.bind(userController)
        ]
    },
    {
        method: 'post',
        url: '/user/login',
        middlewares: [
            koaBody(),
            userController.login.bind(userController)
        ]
    },
    {
        method: 'post',
        url: '/user/logout',
        middlewares: [
            koaBody(),
            userController.logout.bind(userController)
        ]
    },

    {
        method: 'get',
        url: '/user/profile',
        middlewares: [
            userController.getProfile.bind(userController)
        ]
    },
    {
        method: 'get',
        url: '/user/articles/published',
        middlewares: [
            userController.getPublishedArticles.bind(userController)
        ]
    },
    {
        method: 'get',
        url: '/user/articles/replied',
        middlewares: [
            userController.getRepliedArticles.bind(userController)
        ]
    },

    {
        method: 'post',
        url: '/article',
        middlewares: [
            auth(),
            koaBody(),
            articleController.publish.bind(articleController)
        ]
    },
    {
        method: 'get',
        url: '/articles',
        middlewares: [
            koaBody(),
            articleController.getList.bind(articleController)
        ]
    },
    {
        method: 'get',
        url: '/article/:id',
        middlewares: [
            koaBody(),
            articleController.getDetail.bind(articleController)
        ]
    },

    {
        method: 'post',
        url: '/reply',
        middlewares: [
            koaBody(),
            replyController.post.bind(replyController)
        ]
    },

    {
        method: 'get',
        url: '/replies',
        middlewares: [
            replyController.getList.bind(replyController)
        ]
    }

];

module.exports = routes;