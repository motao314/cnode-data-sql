const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const assert = require('assert');
const { baseUrl, init } = require('./base');

let request = supertest(baseUrl + '/auth');

describe('授权接口', async function () {

    this.timeout(0);

    let initUser;

    before(async () => {
        await init();

        initUser = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'data') + '/init-user.json').toString()
        );
    });

    describe('用户注册', async () => {

        const url = '/register';

        it('注册用户名和密码不允许为空', async () => {
            await request.post(url).expect(400, {
                code: 1011, message: '注册用户名和密码不允许为空'
            });
        });

        it('两次输入密码不一致', async () => {
            await request.post(url).send({
                username: initUser.username,
                password: initUser.password,
                repassword: initUser.repassword + '1'
            }).expect(400, {
                code: 1012, message: '两次输入密码不一致'
            });

        });

        it('用户名已经被注册了', async () => {
            await request.post(url)
                .send({
                    username: initUser.username,
                    password: initUser.password,
                    repassword: initUser.repassword
                })
                .expect(409, {
                    code: 1013, message: '用户名已经被注册了'
                })
        });

        it('注册成功', async () => {
            await request.post(url).send({
                username: `test_${Date.now()}`,
                password: '123456',
                repassword: '123456'
            }).expect(200).then((res) => {
                assert.strictEqual(typeof res.body.results.id, 'number');
            });
        })
    });

    describe('用户登录', async () => {
        const url = '/login';

        it('登录用户名和密码不允许为空', async () => {
            await request.post(url).expect(400, {
                code: 1021, message: '登录用户名和密码不允许为空'
            });
        });

        it('用户不存在', async () => {
            await request.post(url).send({
                username: `nontest_${Date.now()}`,
                password: '123456'
            }).expect(404, {
                code: 1022,
                message: '用户不存在'
            });
        });

        it('密码错误', async () => {
            await request.post(url).send({
                username: initUser.username,
                password: initUser.password + '1',
            }).expect(401, {
                code: 1023, message: '密码错误'
            })
        });

        it('用户登录成功', async () => {
            await request.post(url).send({
                username: initUser.username,
                password: initUser.password
            }).expect(200).then((res) => {
                let authorization = res.headers.authorization;
                if (!authorization) {
                    throw new Error('header authorization is not found!');
                }
                fs.writeFileSync(path.resolve(__dirname, 'data') + '/authorization.txt', authorization);
            });
        });

    });
});
