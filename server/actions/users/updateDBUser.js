const { User } = require('../../models');
const { logger } = require('../../utils');

async function updateDBUser({
  id,
  username,
  name,
  passwordHash,
  blogs,
  contacts,
}) {
  const updatedDBUser = await User.findByIdAndUpdate(
    id,
    {
      username,
      name,
      passwordHash,
      blogs,
      contacts,
    },
    { new: true, runValidators: true, context: 'query' }
  );
  logger.log('MongoDB updated user', updatedDBUser);
  return updatedDBUser;
}

module.exports = updateDBUser;
