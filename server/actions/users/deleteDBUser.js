const { User } = require('../../models');
const { logger } = require('../../utils');

async function deleteDBUser(id) {
  const dbDeletedUser = await User.findByIdAndRemove(id);
  logger.log('MongoDB deleted user', dbDeletedUser);
  return dbDeletedUser;
}

module.exports = deleteDBUser;
