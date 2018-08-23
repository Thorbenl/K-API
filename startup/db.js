const mongoose = require('mongoose');
const winston = require('winston');


module.exports = function () {
    mongoose.Promise = global.Promise;
    if (process.env.NODE_ENV !== 'test') {
        mongoose.connect('mongodb://localhost:27017/K-API', { useNewUrlParser: true })
            .then(() => winston.info('Connected to the database'))
            .catch(err => console.error('Could not connect to the database.', err))
    }
}