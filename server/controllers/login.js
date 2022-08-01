const loginRouter = require('express').Router();
const { getDBUserByUsername } = require('../actions/users');
const { logger, bcryptUtils, tokenUtils } = require('../utils');

// ** simply returns new token username, name, id
loginRouter.get('/', async (request, response) => {
  console.log('confirm get user token here');
  const { token } = request;

  const isTokenValid = tokenUtils.isTokenValid(token);
  if (!isTokenValid) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const { username } = tokenUtils.decodeToken(token);
  const user = await getDBUserByUsername(username);

  const newToken = tokenUtils.createToken(user.username, user._id);
  logger.log('refreshed token', token);

  response
    .status(200)
    .send({ token: newToken, username: user.username, name: user.name });
});

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 3) {
    return response.status(401).json({
      error: 'password must be at least 3 characters long.',
    });
  }

  const user = await getDBUserByUsername(username);
  console.log('do I get id back???', user);

  const passwordCorrect =
    user === null
      ? false
      : await bcryptUtils.isMatch(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const token = tokenUtils.createToken(user.username, user._id);
  logger.log('token', token);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
