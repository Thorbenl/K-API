const ArtistController = require('../../controllers/artistsController');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', ArtistController.index);

router.get('/:id', ArtistController.view);

router.post('/', auth, ArtistController.create);

router.put('/:id', auth, ArtistController.edit);

router.delete('/:id', [auth, admin], ArtistController.delete);

module.exports = router;