const loginRouter = require('./login');
const usersRouter = require('./users');
const blogsRouter = require('./blogs');
const contactsRouter = require('./contacts');
const cypressTestsRouter = require('./cypressTests');

module.exports = {
  loginRouter,
  usersRouter,
  blogsRouter,
  contactsRouter,
  cypressTestsRouter,
};
