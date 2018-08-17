const Artist = require('../models/artist');
const Joi = require('joi');

function validateArtist(artist) {
    const schema = {
        stageName: Joi.string().min(3).max(255).required(),
        realName: Joi.string().min(5).max(255).required(),
        company: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(artist, schema)
}

module.exports = {
    index(req, res, next) {
      Artist
          .find({})
          .sort({ $natural: 1 })
          .then(artist => res.send(artist))
          .catch(next);
    },

    create(req, res, next) {
        const { error } = validateArtist(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let artistProps = req.body;
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
    },

    view(req, res, next) {
        const artistId = req.params.id;
        const artistProps = req.body;

        Artist.findById({ _id: artistId}, artistProps)
            .then(() => Artist.findById({_id: artistId}))
            .then(artist => res. send(artist))
            .catch(next);

    }
};