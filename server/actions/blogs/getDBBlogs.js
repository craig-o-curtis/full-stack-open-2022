const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function getDBBlogs() {
  try {
    console.log('getting blogs');
    const dbBlogs = await Blog.find({});
    console.log('got blogs here', dbBlogs);
    logger.log('MongoDB returning blogs', dbBlogs);
    return dbBlogs;
  } catch (error) {
    console.log('got erer');
    console.log(error);
  }
}

module.exports = getDBBlogs;
