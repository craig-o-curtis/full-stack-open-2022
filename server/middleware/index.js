const requestLogger = require('./requestLogger');
const errorHandler = require('./errorHandler');
const tokenExtractor = require('./tokenExtractor');
const userExtractor = require('./userExtractor');
const unknownEndpoint = require('./unknownEndpoint');

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
};
