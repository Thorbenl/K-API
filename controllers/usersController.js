const User = require('../models/user');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../middleware/token');

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
    };
    return Joi.validate(user, schema)
}

module.exports = {
    getUser: async (req, res) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    },
    create: async (req, res) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body,
            [
                'name',
                'email',
                'password'
            ]
        ));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.header('x-auth-token', generateAuthToken()).send(_.pick(user,
            [
                '_id',
                'name',
                'email'
            ]
        ));
    },
};