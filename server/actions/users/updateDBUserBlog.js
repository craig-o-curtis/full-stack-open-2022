const { User } = require('../../models');
const { logger } = require('../../utils');
const getDBUserById = require('./getDBUserById');

async function updateDBUserBlog({ userId, blogId }) {
  const userBlogs = (await getDBUserById(userId)).blogs;
  const updatedBlogs = userBlogs.concat(blogId);

  const updatedDBUser = await User.findByIdAndUpdate(
    userId,
    {
      blogs: updatedBlogs,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  logger.log('MongoDB updated user blogs', updatedDBUser);
  return updatedDBUser;
}

module.exports = updateDBUserBlog;
