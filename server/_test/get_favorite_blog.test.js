const getFavoriteBlog = require('../testUtils/getFavoriteBlog');
const { getMockBlogs } = require('../__mocks__/blogs');

describe('getFavoriteBlog', () => {
  test('returns max likes', () => {
    const blogs = [{ likes: 1 }, { likes: 2 }];
    const result = getFavoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });

  test('returns either of objects with equal max likes', () => {
    const blogs = [{ likes: 1 }, { likes: 3 }, { likes: 3 }, { likes: 2 }];
    const expected = { likes: 3 };
    const result = getFavoriteBlog(blogs);
    expect(result).toEqual(expected);
  });

  test('returns with more realistic mock object', () => {
    const expected = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    const result = getFavoriteBlog(getMockBlogs());
    expect(result).toEqual(expected);
  });

  test('returns null for no blogs passed in or empty array', () => {
    expect(getFavoriteBlog()).toBe(null);
    expect(getFavoriteBlog([])).toBe(null);
  });
});
