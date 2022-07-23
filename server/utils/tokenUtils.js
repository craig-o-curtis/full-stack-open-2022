const jwt = require('jsonwebtoken');
const config = require('./config');

function createToken(username, id) {
  const userForToken = {
    username,
    id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET);
  return token;
}

function getTokenFrom(request) {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

function isTokenValid(token) {
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id) {
    return false;
  }
  return true;
}

function decodeToken(token) {
  return jwt.verify(token, config.SECRET);
}

module.exports = {
  createToken,
  getTokenFrom,
  isTokenValid,
  decodeToken,
};
