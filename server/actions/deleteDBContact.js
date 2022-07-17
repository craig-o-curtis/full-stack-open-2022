const { Contact } = require('../models');
const { logger } = require('../utils');

async function deleteDBContact(id) {
  const dbDeletedContact = await Contact.findByIdAndRemove(id);
  logger.log('MongoDB deleted contact', dbDeletedContact);
  return dbDeletedContact;
}

module.exports = deleteDBContact;
