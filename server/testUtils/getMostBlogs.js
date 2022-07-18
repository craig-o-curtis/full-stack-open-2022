const groupBy = require('lodash/groupBy');

// ** returns author with largetst amount fo blogs
// ** return value: { author, blogs }
function getMostBlogs(blogs = []) {
  const grouped = groupBy(blogs, 'author');

  // ** Part 4.a 4.6 there's probably a more elegant way, but here you are
  return Object.entries(grouped).reduce((acc, [author, blogs]) => {
    const contender = {
      author,
      blogs: blogs?.length || 0,
    };
    if (acc === null) {
      acc = contender;
    }
    if (acc && acc?.blogs && acc?.blogs?.length <= contender.blogs.length) {
      acc = contender;
    }

    return acc;
  }, null);
}

module.exports = getMostBlogs;
