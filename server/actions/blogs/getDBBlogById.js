const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function getDBBlogById(id) {
  const gbBlog = await Blog.findById(id);
  logger.log('MongoDB returning blog', gbBlog);
  return gbBlog;
}

module.exports = getDBBlogById;
