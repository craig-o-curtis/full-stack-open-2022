const loginRouter = require('express').Router();
const { getDBUserByUsername } = require('../actions/users');
const { bcryptUtils, tokenUtils } = require('../utils');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await getDBUserByUsername(username);

  // TODO actualliy post to users db
  const passwordCorrect =
    user === null
      ? false
      : await bcryptUtils.isMatch(password, user.passwordHash);

  // TODO add to error handler

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
