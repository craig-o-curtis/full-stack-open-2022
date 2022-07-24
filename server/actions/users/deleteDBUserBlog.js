const mongoose = require('mongoose');
const { User } = require('../../models');
const { logger } = require('../../utils');
const getDBUserById = require('./getDBUserById');

async function deleteDBUserBlog({ userId, blogId }) {
  const userBlogs = (await getDBUserById(userId)).blogs;

  console.log('blogs before', userBlogs);
  console.log('blogs before len', userBlogs.length);
  const updatedBlogs = userBlogs.filter(
    (blog_id) => blog_id.toString() !== blogId
  );
  console.log('updatedBlogs after', updatedBlogs);
  console.log('updatedBlogs after len', updatedBlogs.length);

  const updatedDBUser = await User.findByIdAndUpdate(
    userId,
    {
      blogs: updatedBlogs,
    },
    { new: true, runValidators: true, context: 'query' }
  );

  logger.log('MongoDB deleted user blog', updatedDBUser);
  return updatedDBUser;
}

module.exports = deleteDBUserBlog;
