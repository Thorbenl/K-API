const Artist = require('../models/artist');

module.exports = {
    index(req, res, next) {
      Artist.find({})
          .then(artist => res.send(artist))
          .catch(next);
    },

    create(req, res, next) {
        const artistProps = req.body;
        if (Artist.name !== artistProps.name) {
            Artist.create(artistProps)
                .then(artist => res.send(artist))
                .catch(next);
        }
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
        const artistId = req.params.id;
        Artist.findByIdAndRemove({ _id: artistId})
            .then((artist) => res.status(204).send(artist))
            .catch(next);
    }

};