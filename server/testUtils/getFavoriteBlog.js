function getFavoriteBlog(blogs = []) {
  if (blogs.length === 0) {
    return null;
  }
  const maxLikes = Math.max(...blogs.map((b) => b?.likes || 0));
  return blogs.filter((b) => b.likes === maxLikes)[0];
}

module.exports = getFavoriteBlog;
