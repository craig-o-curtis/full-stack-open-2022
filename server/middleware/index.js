const requestLogger = require('./requestLogger');
const errorHandler = require('./errorHandler');
const tokenExtractor = require('./tokenExtractor');
const unknownEndpoint = require('./unknownEndpoint');

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  unknownEndpoint,
};
