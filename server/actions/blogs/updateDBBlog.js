const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function updateDBBlog({ id, title, author, url, likes }) {
  const updatedDBBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      author,
      url,
      likes,
    },
    { new: true, runValidators: true, context: 'query' }
  );
  logger.log('MongoDB updated blog', updatedDBBlog);
  return updatedDBBlog;
}

module.exports = updateDBBlog;
