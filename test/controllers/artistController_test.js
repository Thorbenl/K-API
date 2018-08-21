const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Artist = mongoose.model('artist');

describe('Artists Controller', () => {
    it('handles a GET request to /api/artists', (done) => {
        request(app)
            .post('/api/artists')
            .send( {name: 'Seventeen'} )
        request(app)
            .get('/api/artists')
            .end(() => {
                Artist.find({})
                    .then((artist) => {
                        assert(artist !== null);
                    });
                done();
            });
    });
    it('Post Request to /api/artists creates a new artist', (done) => {
        Artist.countDocuments().then(count => {
            request(app)
                .post('/api/artists')
                .send({
                    stageName: 'HyunA',
                    realName: 'Kim Hyu-Ah',
                    birthday: Date.now(),
                    debutDate: Date.now(),
                    company: 'Cube',
                    active: true
                })
                .end(() => {
                    Artist.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });
    it('Put to /api/artists/:id updates an existing record', (done) => {
        const artist = new Artist({
                    stageName: 'HyunA',
                    realName: 'Kim Hyu-Ah',
                    birthday: Date.now(),
                    debutDate: Date.now(),
                    company: 'Cube',
                    active: true
                })
        artist.save().then(() => {
            request(app)
                .put(`/api/artists/${artist._id}`)
                .send({ active: false})
                .end(() => {
                    Artist.findOne({stageName:'HyunA'})
                        .then(artist => {
                            assert(artist.active === false);
                            done();
                        });
                });

        });
    });
});