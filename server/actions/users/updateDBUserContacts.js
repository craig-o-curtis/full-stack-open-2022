const { User } = require('../../models');
const { logger } = require('../../utils');
const getDBUserById = require('./getDBUserById');

async function updateDBUserContacts({ id, contactId }) {
  const userContacts = (await getDBUserById(id)).contacts;
  const updatedContacts = userContacts.concat(contactId);

  const updatedDBUser = await User.findByIdAndUpdate(
    id,
    {
      contacts: updatedContacts,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  logger.log('MongoDB updated user contacts', updatedDBUser);
  return updatedDBUser;
}

module.exports = updateDBUserContacts;
