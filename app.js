const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/api');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/K-API');
}

app.use(morgan('dev'));
app.use(bodyParser.json());
routes(app);

module.exports = app;