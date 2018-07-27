const Artist = require('../models/artist');

module.exports = {
    greeting(req, res) {
      res.send({hi: 'there'});
    },

    create(req, res, next) {
        const artistProps = req.body;

        Artist.create(artistProps)
            .then(artist => res.send(artist))
            .catch(next);
    },

    edit(req, res, next) {
        const artistId = req.params.id;
        const artistProps = req.body;

        Artist.findByIdAndUpdate({ _id: artistId}, artistProps)
            .then(() => Artist.findById({_id: artistId}))
            .then(artist => res. send(artist))
            .catch(next);

    },

    delete(req, res, next) {

    }
};