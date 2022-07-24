const { User } = require('../../models');
const { logger } = require('../../utils');

async function getDBUserById(id) {
  const dbUser = await User.findById(id);
  logger.log('MongoDB returning user', dbUser);
  return dbUser;
}

module.exports = getDBUserById;
