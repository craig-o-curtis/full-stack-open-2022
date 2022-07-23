const logger = require('./logger');

function requestLogger(request, response, next) {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
}

function unknownEndpoint(request, response) {
  response.status(404).send({ error: 'unknown endpoint' });
}

function errorHandler(error, request, response, next) {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id.' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'InvalidIdError') {
    return response.status(404).send({ error: error.message });
  }
  if (error.name === 'SaveItemError') {
    return response.status(404).send({ error: error.message });
  }
  if (error.name === 'PropertyExistsError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'MissingPropertiesError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token.' });
  }
  logger.error(error.message);
  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
