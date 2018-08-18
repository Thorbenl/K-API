const User = require('../models/user');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
    };
    return Joi.validate(user, schema)
}

module.exports = {
    create: async (req, res, next) => {

        const { error } = validateUser(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (user)
            return res.status(400).send('User already registered');

        user = new User(_.pick(
            req.body,
            [
                'name',
                'email',
                'password'
            ]
        ));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const token = user.generateAuthToken();

        await User.create(user)
            .then(user => res.header('x-auth-token', token).send(_.pick(
                user,
                [
                    '_id',
                    'name',
                    'email'
                ]
            )))
            .catch(next);
    },
};