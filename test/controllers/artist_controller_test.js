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
    it('Post Request to /api/artists creates a new artist', done => {
        Artist.countDocuments().then(count => {
            request(app)
                .post('/api/artists')
                .send( {name: 'Seventeen', label: 'SM', genre: ['pop']} )
                .end(() => {
                    Artist.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });
    it('Put to /api/artists/:id updates an existing record', done => {
        const artist = new Artist({ name: '2NE1', active: true, label: 'YG', genre: ['pop']});
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
    it('Delete request to /api/artists/:id to delete an existing record', done => {
        const artist = new Artist({name: 'Big Bang', label: 'YG', genre: ['pop']});
        artist.save().then(() => {
            request(app)
                .delete(`/api/artists/${artist._id}`)
                .end(() => {
                    Artist.findOne({name: 'Big Bang'})
                        .then((artist) => {
                            assert(artist === null);
                            done();
                        });
                });
        });
    });
});