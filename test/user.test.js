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
        authorizationString = fs.readFileSync(path.resolve(__dirname, 'data') + '/authorization.json').toString();
    });

    describe('获取用户基础信息', async () => {

        const url = '/profile';

        it('没有登录', async () => {
            await request.get('/profile').expect(401);
        });

        it('获取用户基础信息', async () => {
            await request.get('/profile').set({
                'authorization': authorizationString
            }).expect(200);
        });
    });

    describe('编辑用户基础信息', async () => {

        it('编辑用户基础信息', async () => {
            // TODO: 编辑用户基础信息
        });
    });


    describe('用户头像上传', async () => {

        let avatarUploadFile = path.resolve(__dirname, 'data') + '/avatar/2.jpg';

        it('没有登录', async () => {
            await request.post('/avatar').expect(401);
        });

        it('上传用户头像', async () => {
            await request.post('/avatar').set({
                'authorization': authorizationString
            }).attach('avatar', avatarUploadFile).expect(200);
        });
    });
})

