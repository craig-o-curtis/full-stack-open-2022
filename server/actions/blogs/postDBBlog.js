const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function postDBBlog({ title, author, url, likes, user }) {
  // ** Need to get user ID somehow
  // ** Need to also add to array of blogs on user

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user,
  });

  const createdBlog = await newBlog.save();
  logger.log(`MongoDB Blog created`, createdBlog);
  return createdBlog;
}

module.exports = postDBBlog;
