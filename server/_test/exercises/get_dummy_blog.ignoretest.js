const getDummyBlog = require('../../testUtils/exercises/getDummyBlog');

describe('getDummyBlog', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = getDummyBlog(blogs);
    expect(result).toBe(1);
  });
});
