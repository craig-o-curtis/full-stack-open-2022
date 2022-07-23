const { User } = require('../../models');
const { logger } = require('../../utils');
const sortBy = require('lodash/sortBy');

async function getDBUsers() {
  // ** opting out of .find({}).populate('blogs')
  // ** as users vs. blogs vs. contacts are in separate dbs

  const dbUsers = await User.find({});
  logger.log('MongoDB returning users', dbUsers);
  return sortBy(dbUsers, (user) => user.username);
}

module.exports = getDBUsers;
