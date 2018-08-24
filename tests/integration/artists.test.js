const request = require('supertest');
const Artist = require('../../models/artist');
let server;

describe('/api/artists', () => {

    beforeEach(() => {
        server = require('../../app');
    });
    afterEach(async () => {
        server.close();
        await Artist.remove({});
    });

    describe('GET /artists', () => {
        it('should return all artists', async () => {
            await Artist.collection.insertMany([
                { stageName: 'artist1' },
                { stageName: 'artist2' }
            ]);
            const res = await request(server).get('/api/artists');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });
});