const UserController = require('../controllers/users_controller');
const express = require('express');
const router = express.Router();

router.post('/', UserController.create);

module.exports = router;