const ArtistController = require('../controllers/artists_controller');

module.exports = (app) => {

    app.get('/api/artists', ArtistController.index);

    app.get('/api/artists/:id', ArtistController.view);

    app.post('/api/artists', ArtistController.create);

    app.put('/api/artists/:id', ArtistController.edit);

    app.delete('/api/artists/:id', ArtistController.delete);

};