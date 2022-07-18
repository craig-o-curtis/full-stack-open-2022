const config = require('./config');
const logger = require('./logger');
const middleware = require('./middleware');
const mongoConnection = require('./mongoConnection');

module.exports = {
  config,
  logger,
  middleware,
  mongoConnection,
};
