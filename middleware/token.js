const jwt = require('jsonwebtoken');
const config = require('config');
const user = require('../models/user');

module.exports = function () {
    const jwtPayload = {
        _id: user._id,
        isAdmin: user.isAdmin
    };

    const token = jwt.sign(jwtPayload, config.get('jwtPrivateKey'));

    return token;


};