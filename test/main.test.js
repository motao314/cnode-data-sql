const request = require('supertest');
const { baseUrl } = require('./base');

describe('main', async () => {

    it('/', async () => {
        await request(baseUrl).get('').expect(200);
    })
});