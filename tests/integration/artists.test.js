const request = require('supertest');
const Artist = require('../../models/artist');
let server;

describe('/api/artists', () => {
    
    beforeEach(() => { server = require('../../app'); });
    afterEach ( async () => {
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
    
    describe('GET /:id', () => {
        it('should return a specific artist', async () => {
            const artist = new Artist({
                stageName: 'Bobby',
                realName: 'Bobbersen',
                company: 'Bobbyland',
                debutDate: new Date(),
                birthday: new Date(),
            });
            await artist.save();
            const res = await request(server).get('/api/artists/' + artist._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('stageName', artist.stageName);
        });
        it('should return 404, if invalid id is passed', async () => {
            const res = await request(server).get('/api/artists/1');

            expect(res.status).toBe(404);
        });
    });
});