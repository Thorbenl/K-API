const Artist = require('../models/artist');
const Joi = require('joi');

function validateArtist(artist) {
    const schema = {
        stageName: Joi.string().min(3).max(255).required(),
        realName: Joi.string().min(5).max(255).required(),
        birthday: Joi.date().required(),
        company: Joi.string().min(5).max(255).required(),
        music: Joi.array().required(),
    };
    return Joi.validate(artist, schema)
}

module.exports = {
    index: async (req, res) => {
        const artists = await Artist.find().sort('name');
        res.send(artists);
    },

    view: async (req, res) => {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).send('The artist was not found');
        res.send(artist);
    },

    create: async (req, res) => {
        const { error } = validateArtist(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        const duplicate = await Artist.findOne({ stageName: req.body.stageName});
        if (duplicate)
            return res.status(400).send('Artist already exists');

        const artist = new Artist({
            stageName: req.body.stageName,
            realName: req.body.realName,
            company: req.body.company,
            birthday: req.body.birthday
        });
         await artist.save();^
        res.send(artist)
    },

    edit: async (req, res) => {
        const { error } = validateArtist(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        const artist = await Artist.findByIdAndUpdate(req.params.id, {
            stageName: req.body.stageName,
            realName: req.body.realName,
            company: req.body.company,
            birthday: req.body.birthday
        }, { new: true });

        if (!artist) return res.status(404).send('The artist with the given ID was not found.');
        res.send(artist);
    },

    delete: async (req, res) => {
        const artist = await Artist.findByIdAndRemove(req.params.id);
        if (!artist) return res.status(404).send('The artist with the given ID was not found.');
        res.send(artist);
    },
};