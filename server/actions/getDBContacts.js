const { Contact } = require('../models');
const { logger } = require('../utils');

async function getDBContacts() {
  // ** {} param for all... because that makes sense
  const contacts = await Contact.find({});
  logger.log('MongoDB returning contacts', contacts);
  return contacts;
}

module.exports = getDBContacts;
