const getTotalLikes = (blogs = []) => {
  return blogs.reduce((acc, curr) => {
    acc += curr?.likes || 0;
    return acc;
  }, 0);
};

module.exports = getTotalLikes;
