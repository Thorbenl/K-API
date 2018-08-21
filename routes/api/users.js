const UserController = require('../../controllers/usersController');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/me', auth, UserController.getUser);
router.post('/', UserController.create);

module.exports = router;