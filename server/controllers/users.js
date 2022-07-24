const usersRouter = require('express').Router();
const { logger, apiUtils, bcryptUtils } = require('../utils');
const {
  getDBUsers,
  getDBUserById,
  postDBUser,
  updateDBUser,
  deleteDBUser,
  checkPropertyExists,
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

  const passwordHash = await bcryptUtils.encrypt(password);

  // ** Backend safety to prevent posting username -- should be handled in the FE
  const userAlreadyExists = await checkPropertyExists({ username: username });

  apiUtils.checkPropertyExistsError(
    userAlreadyExists,
    'username',
    'username must be unique.'
  );

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
  const { username, name, password, blogs, contacts } = body;
  const id = request.params.id;

  // ** Prevent duplicate usernames
  const userAlreadyExists = await checkPropertyExists({ username: username });

  apiUtils.checkPropertyExistsError(
    userAlreadyExists,
    'username',
    'username already taken.'
  );

  const passwordHash =
    password === undefined ? undefined : await bcryptUtils.encrypt(password);

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
