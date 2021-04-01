const fs = require('fs');
const { request } = require('http');
const path = require('path');
const baseUrl = 'http://localhost:8888/api';
const supertest = require('supertest');

let initUser;
let authorizationString;

const init = async () => {

    await initUsers();

    await initAuthorization();

    await initArticles();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

async function initUsers() {
    let initUserData = {
        username: `test${Date.now()}`,
        password: 'test01123456',
        repassword: 'test01123456'
    }
    await supertest(`${baseUrl}/auth`).post(`/register`).send(initUserData).then(res => {
        if (res.body.code === 0) {
            let results = res.body.results;
            let userData = {
                ...initUserData,
                ...results,
            };
            fs.writeFileSync(path.resolve(__dirname, 'data') + '/init-user.json', JSON.stringify(userData));
            initUser = userData;
        }
    });
}


async function initAuthorization() {
    await supertest(`${baseUrl}/auth`).post('/login').send({
        username: initUser.username,
        password: initUser.password
    }).expect(200).then((res) => {
        if (res.body.code === 0) {
            let authorization = res.headers.authorization;

            if (!authorization) {
                throw new Error('header authorization is not found!');
            }
            fs.writeFileSync(path.resolve(__dirname, 'data') + '/authorization.json', authorization);
            authorizationString = authorization;
        }

    });

}

async function initArticles() {
    const articles = [
        {
            title: '文章一',
            content: '内容一'
        },
        {
            title: '文章二',
            content: '内容二'
        },
        {
            title: '文章三',
            content: '内容三'
        },
        {
            title: '文章四',
            content: '内容四'
        }
    ];

    for (let i = 0; i < articles.length; i++) {
        let art = articles[i];
        await supertest(`${baseUrl}`).post('/article').set({
            'authorization': authorizationString
        }).send({
            title: art.title,
            content: art.content
        });
    }
}

module.exports.baseUrl = baseUrl;
module.exports.init = init;
