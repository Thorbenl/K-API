const AuthController = require('../controllers/auth_controller');
const express = require('express');
const router = express.Router();

router.post('/', AuthController.create);

module.exports = router;