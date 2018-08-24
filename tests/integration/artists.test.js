const request = require('supertest');
let server;

describe('/api/artists', () => {

    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(() => {
        server.close();
    });

    describe('GET /artists', () => {
        it('should return all artists', async () => {
            const res = await request(server).get('/api/artists');
            expect(res.status).toBe(200);
        });
    });
});