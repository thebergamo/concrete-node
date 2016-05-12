'use strict';

require('dotenv').config({ silent: true });

const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');

const database = require('./lib/database');

const notFoundHandler = require('./lib/notFound');

const PORT = process.env.PORT || 8000;

const app = module.exports = express();

const logType = process.env.NODE_ENV === 'production' ? 'short' : 'dev';

const userRouter = require('./user/user-router');

app
  .use(methodOverride())
  .use(morgan(logType))
  .use(bodyParser.json())
  .use(expressValidator())
  .use(userRouter(database))
  .use(notFoundHandler);

database.mongo.on('connected', () => {
  app.listen(PORT, () => {
    console.log('Server listen at:', PORT);
  });
});
