const usersRouter = require('express').Router();
const { logger, apiUtils, bcryptUtils, tokenUtils } = require('../utils');
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
        }.`,
      })
      .end();
  }
  // ** handling length here as model is for passwordHash
  if (password.length < 3) {
    return response.status(401).json({
      error: 'password must be at least 3 characters long.',
    });
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

  console.log('NEW DB USER', newDBUser);
  const token = tokenUtils.createToken(newDBUser.username, newDBUser._id);
  console.log('created this new token', token);

  apiUtils.checkUnsavedItemError(newDBUser);
  logger.log('Express created new user', newDBUser);
  response.status(201).json({
    token,
    username: newDBUser.username,
    name: newDBUser.name,
    id: newDBUser._id.toString(),
  });
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

// TODO if delete user, also need to delete their associated contacts and blogs that they've added
usersRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedUser = await deleteDBUser(id);

  apiUtils.checkInvalidIdError(deletedUser);
  logger.log('Express deleted blog', deletedUser);
  response.status(204).end();
});

module.exports = usersRouter;
