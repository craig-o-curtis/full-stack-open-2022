const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function getDBBlogs() {
  try {
    const dbBlogs = await Blog.find({});
    logger.log('MongoDB returning blogs', dbBlogs);
    return dbBlogs;
  } catch (error) {
    logger.error(error);
  }
}

module.exports = getDBBlogs;
