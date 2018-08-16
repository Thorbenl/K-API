const ArtistController = require('../controllers/artists_controller');
const express = require('express');
const artistRouter = express.Router();

module.exports = (artistRouter) => {

    //Artists
    artistRouter.get('/api/artists', ArtistController.index);

    artistRouter.get('/api/artists/:id', ArtistController.view);

    artistRouter.post('/api/artists', ArtistController.create);

    artistRouter.put('/api/artists/:id', ArtistController.edit);

    artistRouter.delete('/api/artists/:id', ArtistController.delete);

};