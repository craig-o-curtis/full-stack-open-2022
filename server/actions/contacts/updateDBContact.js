const { Contact } = require('../../models');
const { logger } = require('../../utils');

async function updateDBContact({ id, name, number }) {
  const updatedDBContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      number,
    },
    { new: true, runValidators: true, context: 'query' }
  );
  logger.log('MongoDB updated contact', updatedDBContact);
  return updatedDBContact;
}

module.exports = updateDBContact;
