const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const { baseUrl, init } = require('./base');

let request = supertest(baseUrl);

describe('回复接口', function() {

    this.timeout(0);

    let initUser;
    let authorizationString;

    before(async () => {
        await init();

        initUser = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'data') + '/init-user.json').toString()
        );
        authorizationString = fs.readFileSync(path.resolve(__dirname, 'data') + '/authorization.txt').toString();
    });

    describe('获取某篇指定文章下的回复列表', async () => {

        const url = '/replies';

        it('获取指定文章下的回复列表', async () => {
            await request.get(url).query({articleId: 1}).expect(200);
        });
    });

    describe('发表回复', async () => {

        const url = '/reply';

        it('没有权限', async () => {
            await request.post(url).send().expect(401);
        });

        it('参数错误', async () => {
            await request.post(url).set('authorization', authorizationString).send().expect(400);
        });

        it('指定文章不存在', async () => {
            await request.post(url).set('authorization', authorizationString).send({articleId: -1}).expect(400);
        });

        it('成功发表一条回复', async () => {
            await request.post(url).set('authorization', authorizationString).send({articleId: 1, content: '测试回复内容'}).expect(200);
        });
    });
});
