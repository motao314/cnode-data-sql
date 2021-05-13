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

        it('文章不存在', async () => {
            await request.get(url + '/-1').expect(404);
        });

        it('成功获取指定文章详情', async () => {
            await request.get(url + '/1').expect(200);
        });
    });

    describe('添加一篇新文章', async () => {

        const method = 'POST';
        const url = '/article';

        it('没有权限', async () => {
            await request.post(url).send({}).expect(401);
        });

        it('参数错误', async () => {
            await request.post(url).set('authorization', authorizationString).send({}).expect(400);
        });

        it('成功添加一篇新的文章', async () => {
            await request.post(url).set('authorization', authorizationString).send({
                categoryId: 1,
                title: '测试标题',
                content: '测试的内容'
            }).expect(200);
        });
    });

    describe('更新指定文章的 viewCount', async () => {

        const method = 'PATCH';
        const url = '/article/-1/view_count';
        const url2 = '/article/1/view_count';

        it('指定文章不存在', async () => {
            await request.patch(url).expect(404);
        });

        it('成功更新指定文章的 viewCount', async () => {
            await request.patch(url2).expect(200);
        });
    });

    describe('置顶文章', async () => {

        const method = 'PATCH';
        const url = '/article/-1/top';
        const url2 = '/article/1/top';

        it('指定文章不存在', async () => {
            await request.patch(url).expect(404);
        });

        it('成功置顶指定的文章', async () => {
            await request.patch(url2).send({isTop: 1}).expect(200);
        });
    });

});
