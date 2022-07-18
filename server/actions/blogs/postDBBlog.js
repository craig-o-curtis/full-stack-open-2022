const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function postDBBlog({ title, author, url, likes }) {
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  const createdBlog = await newBlog.save();
  logger.log(`MongoDB Blog created`, createdBlog);
  return createdBlog;
}

module.exports = postDBBlog;
