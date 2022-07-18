const getTotalLikes = require('../testUtils/getTotalLikes');
const { getMockBlogs } = require('../__mocks__/blogs');

describe('getTotalLikes', () => {
  test('returns 0 for no blogs', () => {
    const blogs = [];

    const result = getTotalLikes(blogs);
    expect(result).toBe(0);
  });

  test('returns accumulated result for blogs with likes', () => {
    const blogs = [{ likes: 10 }, { likes: 90 }];

    const result = getTotalLikes(blogs);
    expect(result).toBe(100);
  });

  test('returns correct result with more realistic object from MongoDB', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    expect(getTotalLikes(blogs)).toBe(5);
  });

  test('returns accumulated result with realistic objects', () => {
    expect(getTotalLikes(getMockBlogs())).toBe(37);
  });
});
