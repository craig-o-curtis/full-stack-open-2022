const { getTokenFrom } = require('../utils/tokenUtils');

function tokenExtractor(request, response, next) {
  request.token = getTokenFrom(request);
  next();
}

module.exports = tokenExtractor;
