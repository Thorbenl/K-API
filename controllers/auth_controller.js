const User = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
    };
    return Joi.validate(req, schema)
}

module.exports = {
    create: async (req, res, next) => {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).send('Invalid Email or Password');

        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send('Invalid Email or Password');

        const token = user.generateAuthToken();

        res.send(token);
    },
};