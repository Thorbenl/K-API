require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const config = require('config');

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    );

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB,{
    db: 'mongodb://localhost:27017/K-API',
    level: 'info'
});

const artists = require('./routes/api/artists');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/K-API', { useNewUrlParser: true })
        .then(() => console.log('Connected to the database'))
        .catch(err => console.error('Could not connect to the database.', err))
}

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled...')
}
if (!config.get('jwtPrivateKey')) {
    console.log('ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/artists', artists);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

module.exports = app;