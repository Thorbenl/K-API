const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

if (process.env.NODE_ENV === 'production') {
  require('./startup/prod')(app);
}

app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3050;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;