const { Contact } = require('../models');
const { logger } = require('../utils');

async function updateDBContact({ id, name, number }) {
  const updateDBContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      number,
    },
    { new: true, runValidators: true, context: 'query' }
  );
  logger.log('MongoDB updated contact', updateDBContact);
  return updateDBContact;
}

module.exports = updateDBContact;
