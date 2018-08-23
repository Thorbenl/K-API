const express = require('express');
const artists = require('../routes/api/artists');
const users = require('../routes/api/users');
const auth = require('../routes/api/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/artists', artists);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
};