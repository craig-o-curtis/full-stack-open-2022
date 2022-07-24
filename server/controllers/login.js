const loginRouter = require('express').Router();
const { getDBUserByUsername } = require('../actions/users');
const { bcryptUtils, tokenUtils } = require('../utils');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 3) {
    return response.status(401).json({
      error: 'password must be at least 3 characters long.',
    });
  }

  const user = await getDBUserByUsername(username);

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

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
