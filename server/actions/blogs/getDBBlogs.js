const { Blog } = require('../../models');
const { logger } = require('../../utils');
const sortBy = require('lodash/sortBy');

async function getDBBlogs() {
  const dbBlogs = await Blog.find({});
  logger.log('MongoDB returning blogs', dbBlogs);
  return sortBy(dbBlogs, (item) => item.title);
}

module.exports = getDBBlogs;
