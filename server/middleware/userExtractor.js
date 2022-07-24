const tokenUtils = require('../utils/tokenUtils');

function userExtractor(request, response, next) {
  const user = tokenUtils.decodeToken(request.token);
  request.user = user;
  next();
}

module.exports = userExtractor;
