const jwt = require('jsonwebtoken');
const config = require('config');
const user = require('../models/user');

module.exports = function () {
    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};