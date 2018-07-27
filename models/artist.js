const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    release_date: Date,
    copiesSold: Number,
    numberTracks: Number,
    image: String
});

const ArtistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    debutDate: Date,
    image: String,
    genre: {
        type: String,
        required: true
    },
    companyName: String,
    active: {
        type: Boolean,
        default: true
    },
    music: [AlbumSchema]
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;