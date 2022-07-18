const getFavoriteBlog = require('../testUtils/getFavoriteBlog');

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

  test('returns null for no blogs passed in or empty array', () => {
    expect(getFavoriteBlog()).toBe(null);
    expect(getFavoriteBlog([])).toBe(null);
  });
});
