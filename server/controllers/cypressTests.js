const cypressTestsRouter = require('express').Router();
const { Blog, User } = require('../models');
const { logger, bcryptUtils, tokenUtils } = require('../utils');

cypressTestsRouter.post('/reset', async (request, response) => {
  logger.log('Resetting Cypress Tests...');
  const dbUsers = await User.find({});
  const dbBlogs = await Blog.find({});

  const userIdsToDelete = dbUsers
    .filter((user) => user.username.toLowerCase().includes('cypress'))
    .map((user) => user._id.toString());

  const blogIdsToDelete = dbBlogs
    .filter((blog) => blog.title.toLowerCase().includes('cypress'))
    .map((blog) => blog._id.toString());

  for (const userId of userIdsToDelete) {
    await User.findByIdAndRemove(userId);
  }
  for (const blogId of blogIdsToDelete) {
    await Blog.findByIdAndRemove(blogId);
  }

  logger.log('Express wiped the users and blogs for cypress tests');
  response.status(204).end();
});

cypressTestsRouter.post('/test-user/', async (request, response) => {
  logger.log('Creating Cypress test user...');
  const passwordHash = await bcryptUtils.encrypt('cypress');
  const testUser = new User({
    username: 'cypress',
    name: 'cypress',
    passwordHash: passwordHash,
    contacts: [],
    blogs: [],
  });
  const postedDBUser = await testUser.save();
  const token = tokenUtils.createToken(postedDBUser.username, postedDBUser._id);
  logger.log('Express created new cypress  user', postedDBUser);

  logger.log('Created tes user::: ', {
    postedDBUser,
    token,
  });

  response.status(201).json({
    token,
    username: postedDBUser.username,
    name: postedDBUser.name,
    id: postedDBUser._id.toString(),
  });
});

module.exports = cypressTestsRouter;
