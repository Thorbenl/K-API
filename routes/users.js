const UserController = require('../controllers/users_controller');

module.exports = (app) => {

    //Users
    app.post('/api/user', UserController.create);

};