const { Contact } = require('../models');
const { logger } = require('../utils');

async function getDBContactById(id) {
  const contact = await Contact.findById(id);
  logger.log('MongoDB returning contact', contact);
  return contact;
}

module.exports = getDBContactById;
