const supertest = require('supertest');
const { baseUrl } = require('./base');

let request = supertest(baseUrl + '/auth');

describe('回复接口', async () => {

    beforeEach(() => {
        // TODO: reply before each test
        console.log('before each test');
    });

    describe('获取某篇指定文章下的回复列表', async () => {

        const method = 'GET';
        const url = '/reply';

        it('指定文章不存在', async () => {
            // TODO: 指定文章不存在
        });

        it('获取指定文章下的回复列表', async () => {
            // TODO: 获取指定文章下的回复列表
        });
    });

    describe('发表回复', async () => {

        const method = 'POST';
        const url = '/reply';

        it('没有登录', async () => {
            // TODO: 没有登录
        });

        it('没有权限', async () => {
            // TODO: 没有权限
        });

        it('参数错误', async () => {
            // TODO: 参数错误
        });

        it('指定文章不存在', async () => {
            // TODO: 指定文章不存在
        });

        it('成功发表一条回复', async () => {
            // TODO: 成功发表一条回复
        });
    });
});