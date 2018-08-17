const ArtistController = require('../controllers/artists_controller');
const express = require('express');
const router = express.Router();

router.get('/', ArtistController.index);

router.get('/:id', ArtistController.view);

router.post('/', ArtistController.create);

router.put('/:id', ArtistController.edit);

router.delete('/:id', ArtistController.delete);

module.exports = router;