const ArtistController = require('../controllers/artists_controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', ArtistController.index);

router.get('/:id', ArtistController.view);

router.post('/', auth, ArtistController.create);

router.put('/:id', auth, ArtistController.edit);

router.delete('/:id', auth, ArtistController.delete);

module.exports = router;