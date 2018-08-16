const User = require('../models/user');

module.exports = {
    create(req, res, next) {
        let userProps = req.body;
        User.create(userProps)
            .then(User => res.send(User))
            .catch(next);
    },
};