const getDBBlogs = require('./getDBBlogs');
const getDBBlogById = require('./getDBBlogById');
const postDBBlog = require('./postDBBlog');
const updateDBBlog = require('./updateDBBlog');
const deleteDBBlog = require('./deleteDBBlog');

module.exports = {
  getDBBlogs,
  getDBBlogById,
  postDBBlog,
  updateDBBlog,
  deleteDBBlog,
};
