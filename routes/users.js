const UserController = require('../controllers/users_controller');
const express = require('express');
const usersRouter = express.Router();

module.exports = (usersRouter) => {

    //Users
    usersRouter.post('/api/users', UserController.create);

};