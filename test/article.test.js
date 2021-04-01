const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const { baseUrl, init } = require('./base');

let request = supertest(baseUrl);

describe('文章接口', async function () {

    this.timeout(0);

    let initUser;
    let authorizationString;

    before(async () => {
        await init();

        initUser = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'data') + '/init-user.json').toString()
        );
        authorizationString = fs.readFileSync(path.resolve(__dirname, 'data') + '/authorization.json').toString();
    });

    describe('获取文章列表', async () => {

        const url = '/articles';

        it('获取文章列表', async () => {
            await request.get(url).expect(200);
        })
    });

    describe('获取指定文章详情', async () => {

        const url = '/article';

        it('成功获取指定文章详情', async () => {
            // TODO: 成功获取指定文章详情
        });

        it('获取不存在的文章详情', async () => {
            // TODO: 获取不存在的文章详情
        });
    });

    describe('添加一篇新文章', async () => {

        const method = 'POST';
        const url = '/article';

        it('没有登录', async () => {
            // TODO: 没有登录
        });

        it('参数错误', async () => {
            // TODO: 参数错误
        });

        it('成功添加一篇新的文章', async () => {
            // TODO: 成功添加一篇新的文章
        });
    });

    describe('修改指定文章', async () => {

        const method = 'PATCH';
        const url = '/article';

        it('没有登录', async () => {
            // TODO: 没有登录
        });

        it('没有权限', async () => {
            // TODO: 没有权限
        });

        it('指定要编辑的文章不存在', async () => {
            // TODO: 指定要编辑的文章不存在 
        });

        it('指定文章编辑成功', async () => {
            // TODO: 指定文章编辑成功
        });
    });

    describe('删除一篇指定的文章', async () => {

        const method = 'DELETE';
        const url = '/article';

        it('没有登录', async () => {
            // TODO: 没有登录
        });

        it('没有权限', async () => {
            // TODO: 没有权限
        });

        it('指定要删除的文章不存在', async () => {
            // TODO: 指定要删除的文章不存在
        });

        it('指定文章删除成功', async () => {
            // TODO: 指定文章删除成功
        });
    });

});