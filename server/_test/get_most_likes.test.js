const getMostLikes = require('../testUtils/getMostLikes');
const { getMockBlogs } = require('../__mocks__/blogs');

describe('getMostLikes', () => {
  test('returns author with most likes', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    const result = getMostLikes(getMockBlogs());
    expect(result).toEqual(expected);
  });

  test('returns null gracefully on no or undefined blogs', () => {
    expect(getMostLikes()).toEqual(null);
    expect(getMostLikes([])).toEqual(null);
  });
});
