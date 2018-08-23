const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3050;
app.listen(port, () => winston.info(`Listening on port ${port}...`));