const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost:27017/K-API_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', err);
        });
});

beforeEach(done => {
    const { artists } = mongoose.connection.collections;
    artists.drop()
        .then(() => done())
        .catch(() => done())
    const { users } = mongoose.connection.collections;
    users.drop()
        .then(() => done())
        .catch(() => done())
});