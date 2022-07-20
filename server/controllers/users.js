const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const { logger, apiUtils } = require('../utils');
const {
  getDBUsers,
  getDBUserById,
  postDBUser,
  updateDBUser,
  deleteDBUser,
} = require('../actions/users');

usersRouter.get('/', async (request, response) => {
  const dbUsers = await getDBUsers();
  logger.log(`Express got users`, dbUsers);
  response.json(dbUsers);
});

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const dbUser = await getDBUserById(id);
  logger.log('Express got user', dbUser);

  apiUtils.checkInvalidIdError(dbUser);
  response.json(dbUser);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (username === undefined || name === undefined || password === undefined) {
    return response
      .status(400)
      .json({
        error: `Missing ${
          username === undefined
            ? 'username'
            : name === undefined
            ? 'name'
            : 'passwordHash'
        }`,
      })
      .end();
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // ** Backend safety to prevent posting username -- should be handled in the FE
  const dbUsers = await getDBUsers();
  const usernameAlreadyExists = dbUsers.find((b) => b.username === username);
  apiUtils.checkPropertyExistsError(usernameAlreadyExists, 'username');

  const newDBUser = await postDBUser({
    username,
    name,
    passwordHash,
    contacts: [],
    blogs: [],
  });

  apiUtils.checkUnsavedItemError(newDBUser);
  logger.log('Express created new user', newDBUser);
  response.status(201).json(newDBUser);
});

usersRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const { username, name, passwordHash, blogs, contacts } = body;
  const id = request.params.id;

  // ** Prevent duplicate usernames
  const dbUsers = await getDBUsers();
  const usernameAlreadyExists = dbUsers.find((b) => b.username === username);
  apiUtils.checkPropertyExistsError(usernameAlreadyExists, 'username');

  const result = await updateDBUser({
    id,
    username,
    name,
    passwordHash,
    blogs,
    contacts,
  });
  logger.log('Express updated user', result);

  apiUtils.checkInvalidIdError(result);
  response.json(result);
});

usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedUser = await deleteDBUser(id);

  apiUtils.checkInvalidIdError(deletedUser);
  logger.log('Express deleted blog', deletedUser);
  response.status(204).end();
});

module.exports = usersRouter;
