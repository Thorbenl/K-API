const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: String,
    release_date: Date,
    copiesSold: Number,
    numberTracks: Number,
    image: String
});

module.exports = AlbumSchema;