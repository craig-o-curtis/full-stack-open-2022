const { User } = require('../../models');
const { logger } = require('../../utils');

async function postDBUser({
  username,
  name,
  passwordHash,
  contacts = [],
  blogs = [],
}) {
  const newUser = new User({
    username,
    name,
    passwordHash,
    contacts: contacts || [],
    blogs: blogs || [],
  });
  const postedDBUser = await newUser.save();
  logger.log('MongoDB user created', postedDBUser);
  return postedDBUser;
}

module.exports = postDBUser;
