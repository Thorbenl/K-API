const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TracklistSchema = new Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    trackNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 24
    },
});

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: Date,
    numberOfTracks: Number,
    tracklist: [TracklistSchema]
});

const ArtistSchema = new Schema({
    stageName: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    realName: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    birthday: {
        type: Date,
        required: true
    },
    debutDate: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: function () {
            return this.active;
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    music: [AlbumSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;