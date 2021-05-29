const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const { baseUrl, init } = require('./base');

let request = supertest(baseUrl + '/user');


describe('用户接口', async function () {

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

    describe('获取用户基础信息', async () => {

        const url = '/profile';

        it('要获取的用户信息不存在', async () => {
            await request.get(url).query({}).expect(404);
        })

        it('通过id获取用户基础信息', async () => {
            await request.get(url).query({
                type: 0,
                value: 1
            }).expect(200);
        });
        it('通过username获取用户基础信息', async () => {
            await request.get(url).query({
                type: 1,
                value: initUser.username
            }).expect(200);
        });
    });


    describe('用户头像上传', async () => {

        let avatarUploadFile = path.resolve(__dirname, 'data') + '/avatar/2.jpg';

        it('没有登录', async () => {
            await request.patch('/avatar').expect(401);
        });

        it('上传用户头像', async () => {
            await request.patch('/avatar').set({
                'authorization': authorizationString
            }).attach('avatar', avatarUploadFile).expect(200);
        });
    });

    describe('获取指定用户发布的文章', async () => {

        let url = '/articles';

        it('获取指定用户发布的文章', async () => {
            await request.get(url).query({userId: 1}).expect(200);
        });

    });

    describe('获取指定用户回复的所有文章', async () => {

        let url = '/replies';

        it('获取指定用户回复的所有文章', async () => {
            await request.get(url).query({userId: 1}).expect(200);
        });
    });
})

