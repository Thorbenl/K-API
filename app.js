const express = require('express');
const helmet  = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

const artists = require('./routes/artists');
const users = require('./routes/users');

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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use('/api/artists', artists);
app.use('/api/users', users);

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

module.exports = app;