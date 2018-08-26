const ArtistController = require('../../controllers/artistsController');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const validateId = require('../../middleware/valdiateObjectId');

router.get('/', ArtistController.index);

router.get('/:id', validateId, ArtistController.view);

router.post('/', auth, ArtistController.create);

router.put('/:id', [auth, validateId], ArtistController.edit);

router.delete('/:id', [auth, admin, validateId], ArtistController.delete);

module.exports = router;