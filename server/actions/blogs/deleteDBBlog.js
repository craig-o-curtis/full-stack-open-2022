const { Blog } = require('../../models');
const { logger } = require('../../utils');

async function deleteDBBLog(id) {
  const deletedDBBlog = await Blog.findByIdAndRemove(id);
  logger.log('MongoDB deleted blog', deletedDBBlog);
  return deletedDBBlog;
}

module.exports = deleteDBBLog;
