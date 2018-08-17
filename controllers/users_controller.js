const User = require('../models/user');
const Joi = require('joi');

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema)
}


module.exports = {
    create(req, res, next) {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let userProps = req.body;
        User.create(userProps)
            .then(User => res.send(User))
            .catch(next);
    },
};