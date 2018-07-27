const Artist = require('../models/artist');

module.exports = {
    greeting(req, res) {
      res.send({hi: 'there'});
    },

    create(req, res) {
        const artistProps = req.body;

        Artist.create(artistProps)
            .then(artist => res.send(artist));
    }
};