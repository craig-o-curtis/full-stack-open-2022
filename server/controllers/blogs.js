const blogsRouter = require('express').Router();
const { logger, apiUtils, tokenUtils } = require('../utils');
const {
  getDBBlogs,
  getDBBlogById,
  postDBBlog,
  updateDBBlog,
  deleteDBBlog,
} = require('../actions/blogs');
const { updateDBUserBlogs } = require('../actions/users');
const { getDBUserById } = require('../actions/users');

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

// TODO update without token
blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const token = tokenUtils.getTokenFrom(request); // !! DANGER TOKEN
  const isTokenValid = tokenUtils.isTokenValid(token); // !! DANGER TOKEN

  if (!isTokenValid) {
    // !! DANGER TOKEN
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const decodedToken = tokenUtils.decodeToken(token); // !! DANGER TOKEN

  const { title, author, url, likes = 0, userId } = body;
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

  // !! DANGER TOKEN
  // const currentUser = await getDBUserById(userId);
  const currentUser = await getDBUserById(decodedToken.id);

  const newDBBlog = await postDBBlog({
    title,
    author,
    url,
    likes,
    user: currentUser._id,
  }); // ** Then pass this to User service to save

  // ** update user blogs array
  const updatedUser = await updateDBUserBlogs({
    id: userId,
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
  const titleAlreadyExists = dbBlogs.find((b) => b.title === title);
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

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedBlog = await deleteDBBlog(id);

  apiUtils.checkInvalidIdError(deletedBlog);
  logger.log('Express deleted blog', deletedBlog);
  response.status(204).end();
});

module.exports = blogsRouter;
