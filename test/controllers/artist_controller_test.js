const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Artist = mongoose.model('artist');

describe('Artists Controller', () => {
    it('Post Request to /api/artist creates a new artist', done => {
        Artist.countDocuments().then(count => {
            request(app)
                .post('/api/artists')
                .send( {name: 'Seventeen'} )
                .end(() => {
                    Artist.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });
    it('Put to /api/artists/:id updates an existing record', done => {
        const artist = new Artist({ name: '2NE1', active: true});
        artist.save().then(() => {
            request(app)
                .put(`/api/artists/${artist._id}`)
                .send({ active: false})
                .end(() => {
                    Artist.findOne({name:'2NE1'})
                        .then(artist => {
                            assert(artist.active === false);
                            done();
                        });
                });
        });
    });
});