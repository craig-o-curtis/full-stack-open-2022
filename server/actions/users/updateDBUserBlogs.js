const { User } = require('../../models');
const { logger } = require('../../utils');
const getDBUserById = require('./getDBUserById');

async function updateDBUserBlogs({ id, blogId }) {
  const userBlogs = (await getDBUserById(id)).blogs;
  const updatedBlogs = userBlogs.concat(blogId);

  const updatedDBUser = await User.findByIdAndUpdate(
    id,
    {
      blogs: updatedBlogs,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  logger.log('MongoDB updated user blogs', updatedDBUser);
  return updatedDBUser;
}

module.exports = updateDBUserBlogs;
