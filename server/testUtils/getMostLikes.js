// ** resturns { author, likes }
function getMostLikes(blogs = []) {
  if (blogs.length === 0) {
    return null;
  }

  const maxLikes = Math.max(...blogs.map((b) => b?.likes || 0));
  const topBlog = blogs.filter((b) => b.likes === maxLikes)[0];
  return {
    author: topBlog.author,
    likes: topBlog.likes,
  };
}

module.exports = getMostLikes;
