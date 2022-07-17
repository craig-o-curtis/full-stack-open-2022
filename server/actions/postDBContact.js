const { Contact } = require('../models');
const { logger } = require('../utils');

async function postDBContact({ name, number }) {
  const newContact = new Contact({ name, number });
  const createdContact = await newContact.save();
  logger.log('MongoDB Contact created', createdContact);
  return createdContact;
}

module.exports = postDBContact;
