const AuthController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

router.post('/', AuthController.create);

module.exports = router;