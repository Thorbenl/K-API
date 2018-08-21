const Artist = require('../models/artist');
const Joi = require('joi');

function validateArtist(artist) {
    const schema = {
        stageName: Joi.string().min(3).max(255).required(),
        realName: Joi.string().min(5).max(255).required(),
        company: Joi.string().min(5).max(255).required(),
        birthday: Joi.date().required(),
        debutDate: Joi.date().required(),
        music: Joi.array().required(),
    };
    return Joi.validate(artist, schema)
}

module.exports = {
    index: async (req, res, next) => {
      await Artist
          .find({})
          .then(artist => res.send(artist))
          .catch(next);
    },

    create: async (req, res, next) => {
        const { error } = validateArtist(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        const artist = await Artist.findOne({ stageName: req.body.stageName});
        if (artist)
            return res.status(400).send('Artist already exists');

        let artistProps = req.body;
        await Artist.create(artistProps)
             .then(artist => res.send(artist))
             .catch(next);
    },

    edit: async (req, res, next) => {
        const artistId = req.params.id;
        const artistProps = req.body;

        await Artist.findByIdAndUpdate({ _id: artistId}, artistProps)
            .then(() => Artist.findById({_id: artistId}))
            .then(artist => res. send(artist))
            .catch(next);

    },

    delete: async (req, res, next) => {
        const artistId = req.params.id;
        await Artist.findByIdAndRemove({ _id: artistId})
            .then((artist) => res.status(204).send(artist))
            .catch(next);
    },

    view: async (req, res, next) => {
        const artistId = req.params.id;
        const artistProps = req.body;

        await Artist.findById({ _id: artistId}, artistProps)
            .then(() => Artist.findById({_id: artistId}))
            .then(artist => res. send(artist))
            .catch(next);

    }
};