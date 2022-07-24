const { Contact } = require('../../models');
const { logger } = require('../../utils');
const sortBy = require('lodash/sortBy');

async function getDBContacts() {
  // ** {} param for all... because that makes sense
  const contacts = await Contact.find({});
  logger.log('MongoDB returning contacts', contacts);
  return sortBy(contacts, (item) => item.name);
}

module.exports = getDBContacts;
