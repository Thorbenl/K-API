const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracklistSchema = new Schema({
    trackNumber: Number,
    title: {
        type: String,
        required: true
    },
    duration: String
});

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: Date,
    copiesSold: Number,
    numberTracks: Number,
    trackList: [TracklistSchema]
});

const ArtistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    albums: [AlbumSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;