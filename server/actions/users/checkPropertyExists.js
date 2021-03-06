const { User } = require('../../models');
const { logger } = require('../../utils');

async function checkPropertyExists(propertyObj) {
  const key = Object.keys(propertyObj)[0];
  const property = Object.values(propertyObj)[0];

  const propExists = await User.findOne({ [key]: property });

  if (propExists) {
    logger.log('MongoDB property exists', property);
    return true;
  }
  logger.log('MongoDB property does not exist', property);
  return false;
}

module.exports = checkPropertyExists;
