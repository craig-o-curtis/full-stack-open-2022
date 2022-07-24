const { User } = require('../../models');
const { logger } = require('../../utils');
const getDBUserById = require('./getDBUserById');

async function updateDBUserContact({ userId, contactId }) {
  const userContacts = (await getDBUserById(userId)).contacts;
  const updatedContacts = userContacts.concat(contactId);

  const updatedDBUser = await User.findByIdAndUpdate(
    userId,
    {
      contacts: updatedContacts,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  logger.log('MongoDB updated user contacts', updatedDBUser);
  return updatedDBUser;
}

module.exports = updateDBUserContact;
