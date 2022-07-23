const { User } = require('../../models');
const { logger } = require('../../utils');

async function getDBUserByUsername(username) {
  const dbUser = await User.findOne({ username });
  logger.log('MongoDB returning user by username', dbUser);
  return dbUser;
}

module.exports = getDBUserByUsername;
