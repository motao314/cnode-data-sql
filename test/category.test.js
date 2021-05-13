const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const { baseUrl, init } = require('./base');

let request = supertest(baseUrl);

describe('分类接口', async function () {

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

    describe('获取所有分类', async() => {

        let url = '/categories';

        it('获取所有分类', async () => {
            await request.get(url).expect(200);
        });
    });
});
