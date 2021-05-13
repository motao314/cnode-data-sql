// 2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4

const axios = require('axios');
const jsdom = require('jsdom');
const mysql2 = require('mysql2/promise');
const config = require('./src/config');
const fs = require('fs');
const path = require('path');

const { JSDOM } = jsdom;

let insertUsers = [];
let insertArticles = [];
let insertReplies = [];
let insertUserId = 1;
let insertArticleId = 1;
let insertReplyId = 1;
let tabs = {
    ask: 1,
    job: 2,
    share: 3
};
let tabsValues = Object.keys(tabs);
let t = tabsValues.pop();
let page = 1;
let maxPage = 1;
let db;

(async function () {

    // await getData();

    await insertDb();

})();


async function getData() {
    // insertUsers = [];
    // insertArticles = [];
    // insertReplies = [];

    if (!tabsValues.length) {
        fs.writeFileSync(path.resolve(__dirname, 'db/data') + '/insertUsers.json', JSON.stringify(insertUsers));
        fs.writeFileSync(path.resolve(__dirname, 'db/data') + '/insertArticles.json', JSON.stringify(insertArticles));
        fs.writeFileSync(path.resolve(__dirname, 'db/data') + '/insertReplies.json', JSON.stringify(insertReplies));
        console.log(`完成`);
        return;
    }
    if (page > maxPage) {
        page = 1;
        t = tabsValues.pop();
    }

    let res = await axios.get('https://cnodejs.org/api/v1/topics', {
        params: {
            mdrender: 'false',
            page,
            tab: t,
            limit: 1000
        }
    });

    let { data: { data: articles } } = res;


    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];

        let user = article.author;

        // 获取当前文章对应的用户信息
        let currentArticleUser = insertUsers.find(u => u.originId == article.author_id);

        if (!currentArticleUser) {
            currentArticleUser = {
                id: insertUserId++,
                originId: article.author_id,
                username: user.loginname,
                password: '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4',
                avatar: user.avatar_url,
                isAdmin: 0,
                createdAt: Date.now(),
                lastLoginedAt: Date.now(),
            }
            insertUsers.push(currentArticleUser);
        }

        let articleTime = new Date(article.create_at).getTime();
        insertArticles.push({
            id: insertArticleId++,
            originId: article.id,
            title: article.title,
            content: article.content,
            categoryId: tabs[article.tab] || 0,
            top: Number(article.top),
            userId: currentArticleUser.id,
            viewCount: article.visit_count,
            replyCount: article.reply_count,
            createdAt: articleTime
        });

        // 获取评论信息
        // console.log('articleId', article.id)
        let res2 = await axios.get(`https://cnodejs.org/api/v1/topic/${article.id}`, {
            params: {
                mdrender: 'false'
            }
        });
        // console.log('...', res2.data);

        // console.log('...', res2.data);
        if (res2.data.success) {
            let replies = res2.data.data.replies;

            replies.forEach(function (reply) {
                // 获取当前回复对应的用户信息
                let currentReplyUser = insertUsers.find(u => u.username == reply.author.loginname);

                if (!currentReplyUser) {
                    currentReplyUser = {
                        id: insertUserId++,
                        originId: article.author_id || '',
                        username: reply.author.loginname,
                        password: '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4',
                        avatar: reply.author.avatar_url || '',
                        isAdmin: 0,
                        createdAt: Date.now(),
                        lastLoginedAt: Date.now(),
                    }
                    insertUsers.push(currentReplyUser);
                }

                insertReplies.push({
                    id: insertReplyId++,
                    originId: reply.id,
                    articleId: insertArticleId,
                    userId: currentReplyUser.id || 0,
                    content: reply.content,
                    createdAt: (new Date(reply.create_at)).getTime(),
                });
            })
            console.log(`留言 ${i} / ${replies.length}`);

        }




        // if (res2.data) {
        // const { document } = new JSDOM(res2.data).window;
        // let replyItemDoms = document.getElementsByClassName('reply_area');
        // let replyItemDomsLength = replyItemDoms.length;
        // for (let i = 0; i < replyItemDomsLength; i++) {
        //     let replyItemDom = replyItemDoms[i];
        //     let userAvatarDom = replyItemDom.querySelector('.user_avatar');
        //     let markdownTextDom = replyItemDom.querySelector('.markdown-text');
        //     let user = {
        //         username: '',
        //         avatar: ''
        //     }
        //     if (userAvatarDom) {
        //         userAvatarImgDom = userAvatarDom.querySelector('img');
        //         user.avatar = userAvatarImgDom.src;
        //         user.username = userAvatarImgDom.title;
        //     }
        //     // console.log('user', user);

        //     // 获取当前回复对应的用户信息
        //     let currentReplyUser = insertUsers.find(u => u.username == user.username);

        //     if (!currentReplyUser) {
        //         currentReplyUser = {
        //             id: insertUserId++,
        //             originId: article.author_id || '',
        //             username: user.username,
        //             password: '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4',
        //             avatar: user.avatar_url || '',
        //             isAdmin: 0,
        //             createdAt: Date.now(),
        //             lastLoginedAt: Date.now(),
        //         }
        //         insertUsers.push(currentReplyUser);
        //     }

        // insertReplies.push({
        //     id: insertReplyId++,
        //     originId: replyItemDom.id,
        //     articleId: insertArticleId,
        //     userId: user.id || 0,
        //     content: markdownTextDom.innerHTML || '',
        //     createdAt: articleTime - (Math.random() * 100000),
        // });

        //     console.log(`留言 ${i} / ${replyItemDomsLength}`);
        // }


        // }
        console.log(`当前文章 ${i}/${articles.length}/${page}`);
    }

    page++;
    // await sleep(1000);
    await getData();
}

function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}

async function insertDb() {
    insertUsers = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db/data') + '/insertUsers.json'));
    insertArticles = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db/data') + '/insertArticles.json'));
    insertReplies = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db/data') + '/insertReplies.json'));


    db = await mysql2.createConnection(config.database);

    let insertUsersLength = insertUsers.length;
    console.log(`开始插入用户数据：${insertUsersLength}`);
    for (let i = 0; i < insertUsersLength; i++) {
        let insertUser = insertUsers[i];
        await db.query(
            "INSERT INTO `users` (`id`,`origin_id`,`username`,`password`,`avatar`,`is_admin`,`created_at`,`last_logined_at`) VALUES (?,?,?,?,?,?,?,?)",
            [insertUser.id, insertUser.originId, insertUser.username, insertUser.password, insertUser.avatar, insertUser.isAdmin, insertUser.createdAt, insertUser.lastLoginedAt]
        );
        console.log(`用户：${i + 1}/${insertUsersLength}`);
    }

    let insertArticlesLength = insertArticles.length;
    console.log(`开始插入文章数据：${insertArticlesLength}`);
    for (let i = 0; i < insertArticlesLength; i++) {
        let insertArticle = insertArticles[i];
        // 处理一下 replyCount 小于 0 的问题
        insertArticle.replyCount = insertArticle.replyCount < 0 ? 0 : insertArticle.replyCount;
        await db.query(
            "INSERT INTO `articles` (`id`,`origin_id`,`title`,`category_id`,`is_top`,`user_id`,`view_count`,`reply_count`, `created_at`) VALUES (?,?,?,?,?,?,?,?,?)",
            [insertArticle.id, insertArticle.originId, insertArticle.title, insertArticle.categoryId, insertArticle.top, insertArticle.userId, insertArticle.viewCount, insertArticle.replyCount, insertArticle.createdAt]
        );
        await db.query(
            "INSERT INTO `article_contents` (`article_id`, `content`) VALUES (?,?)",
            [insertArticle.id, insertArticle.content]
        );
        console.log(`文章：${i + 1}/${insertArticlesLength}`);
    }

    let insertRepliesLength = insertReplies.length;
    console.log(`开始插入回复数据：${insertRepliesLength}`);
    for (let i = 0; i < insertRepliesLength; i++) {
        let insertReply = insertReplies[i];
        await db.query(
            "INSERT INTO `replies` (`id`,`origin_id`,`article_id`,`user_id`,`content`,`created_at`) VALUES (?,?,?,?,?,?)",
            [insertReply.id, insertReply.originId, insertReply.articleId, Math.ceil(Math.random() * insertUsers.length), insertReply.content, insertReply.createdAt]
        );
        console.log(`回复：${i + 1}/${insertRepliesLength}`);
    }

    db.close();
    console.log(`数据插入完成`);


    // console.log('关闭数据库');
}