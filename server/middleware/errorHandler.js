const logger = require('../utils/logger');

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
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired.' });
  }
  logger.error(error.message);
  next(error);
}

module.exports = errorHandler;
