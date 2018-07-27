const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    debutDate: Date,
    image: String,
    genre: String,
    companyName: String,
    active: {
        type: Boolean,
        default: true
    }
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;