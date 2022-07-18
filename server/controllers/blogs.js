const blogsRouter = require('express').Router();
const { logger } = require('../utils');
const {
  getDBBlogs,
  getDBBlogById,
  postDBBlog,
  updateDBBlog,
  deleteDBBlog,
} = require('../actions/blogs');

blogsRouter.get('/', async (request, response) => {
  try {
    const dbBlogs = await getDBBlogs();
    logger.log(`Express got blogs`, dbBlogs);
    response.json(dbBlogs);
  } catch (error) {
    logger.error(error);
    response.status(404).end();
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const dbBlog = await getDBBlogById(id);
    logger.log('Express got contact', dbBlog);
    if (dbBlog === null) {
      response.status(404).end();
    }
    response.json(dbBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body || {};
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
    if (titleAlreadyExists) {
      return response.status(400).json({ error: 'Title already exists' }).end();
    }

    const newDBBlog = await postDBBlog({
      title,
      author,
      url,
      likes,
    });
    logger.log('Express created new blog', newDBBlog);
    response.json(newDBBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;
    const { title, author, url, likes = 0 } = body;
    const id = request.params.id;
    const result = await updateDBBlog({
      id,
      title,
      author,
      url,
      likes,
    });
    logger.log('Express updated contact', result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const deletedBlog = await deleteDBBlog(id);
    logger.log('Express deleted blog', deletedBlog);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
