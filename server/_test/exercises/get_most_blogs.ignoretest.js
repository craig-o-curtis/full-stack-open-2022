const getMostBlogs = require('../../testUtils/exercises/getMostBlogs');
const { getMockBlogs } = require('../../__mocks__/blogs');

describe('getMostBlogs', () => {
  test('returns correct guy with most blogs', () => {
    const blogs = [
      { author: 'Guy Dudeman', title: 'Blog 1' },
      { author: 'Guy Dudeman', title: 'Blog 2' },
      { author: 'Man Palboy', title: 'Blog 3' },
    ];
    const expected = {
      author: 'Guy Dudeman',
      blogs: 2,
    };
    const result = getMostBlogs(blogs);
    expect(result).toEqual(expected);
  });

  test('returns correck with realistic mock collection of blogs', () => {
    const expected = {
      author: 'Michael Chan',
      blogs: 2,
    };
    const result = getMostBlogs(getMockBlogs());
    expect(result).toEqual(expected);
  });

  test('result gracefully fails on no or undefined blogs', () => {
    expect(getMostBlogs()).toEqual(null);
    expect(getMostBlogs([])).toEqual(null);
  });
});
