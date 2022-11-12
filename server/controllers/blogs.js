const blogsRouter = require('express').Router();
const { logger, apiUtils, tokenUtils } = require('../utils');
const {
  getDBBlogs,
  getDBBlogById,
  postDBBlog,
  updateDBBlog,
  deleteDBBlog,
} = require('../actions/blogs');
const {
  getDBUserById,
  updateDBUserBlog,
  deleteDBUserBlog,
} = require('../actions/users');
const userExtractor = require('../middleware/userExtractor');

blogsRouter.get('/', async (request, response) => {
  const dbBlogs = await getDBBlogs();
  logger.log(`Express got blogs`, dbBlogs);
  response.json(dbBlogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const dbBlog = await getDBBlogById(id);
  logger.log('Express got blog', dbBlog);

  apiUtils.checkInvalidIdError(dbBlog);
  response.json(dbBlog);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { token, user, body } = request;
  const isTokenValid = tokenUtils.isTokenValid(token);
  if (!isTokenValid) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const { title, author, url, likes = 0 } = body;
  if (title === undefined || author === undefined || url === undefined) {
    return response
      .status(400)
      .json({
        error: `Missing ${
          title === undefined
            ? 'title'
            : author === undefined
            ? 'author'
            : 'url'
        }`,
      })
      .end();
  }

  // ** Backend safety to prevent posting titles -- should be handled in the FE
  const dbBlogs = await getDBBlogs();
  const titleAlreadyExists = dbBlogs.find((b) => b.title === title);
  apiUtils.checkPropertyExistsError(
    titleAlreadyExists,
    'title',
    'title already taken.'
  );

  const currentUser = await getDBUserById(user.id);

  const newDBBlog = await postDBBlog({
    title,
    author,
    url,
    likes,
    user: currentUser._id, // ** save in Mongo OBject format
  }); // ** Then pass this to User service to save

  // ** update user blogs array
  const updatedUser = await updateDBUserBlog({
    userId: user.id,
    blogId: newDBBlog.id,
  });

  apiUtils.checkUnsavedItemError(newDBBlog);
  apiUtils.checkUnsavedItemError(updatedUser);

  logger.log('Express created new blog', newDBBlog);
  response.status(201).json(newDBBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  // ** no need to update userId as it is already on the object
  const body = request.body;
  const { title, author, url, likes = 0 } = body;
  const id = request.params.id;

  const dbBlogs = await getDBBlogs();
  const dbBlog = dbBlogs.find((b) => b.title === title);
  const isLiking = dbBlog.likes < likes;

  const titleAlreadyExists = isLiking ? false : dbBlog.title === title;

  apiUtils.checkPropertyExistsError(
    titleAlreadyExists,
    'title',
    'title already taken.'
  );

  const result = await updateDBBlog({
    id,
    title,
    author,
    url,
    likes,
  });
  // ** get user id from result, update user blogs
  logger.log('Express updated blog', result);

  apiUtils.checkInvalidIdError(result);
  response.json(result);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params;
  const { token } = request;
  const isTokenValid = tokenUtils.isTokenValid(token);
  if (!isTokenValid) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const decodedToken = tokenUtils.decodeToken(token);

  // ** Check if user is owner of blog
  const dbBlog = await getDBBlogById(id);
  apiUtils.checkInvalidIdError(dbBlog);
  const userId = dbBlog.user;
  const user = await getDBUserById(userId);
  apiUtils.checkInvalidIdError(user);
  if (user.username !== decodedToken.username) {
    return response.status(401).json({ error: 'user is not owner of blog.' });
  }

  // ** delete action 1 - delete blog
  const deletedBlog = await deleteDBBlog(id);
  // ** delete action 2 - delete blog id from user object
  const deletedUserBlog = await deleteDBUserBlog({
    userId: decodedToken.id,
    blogId: id,
  });

  apiUtils.checkInvalidIdError(deletedBlog);
  apiUtils.checkInvalidIdError(deletedUserBlog);
  logger.log('Express deleted blog', deletedBlog);
  logger.log('Express deleted blog from user', deletedUserBlog);
  response.status(204).end();
});

module.exports = blogsRouter;
