const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;