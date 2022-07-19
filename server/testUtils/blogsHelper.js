const Blog = require('../models/Blog');

const initialItems = [
  {
    title: 'Test Blog1',
    author: 'Guy Dudeman',
    url: 'www.example.com',
    likes: 1,
  },
  {
    title: 'Test Blog2',
    author: 'Man Boyson',
    url: 'www.google.com',
    likes: 2,
  },
];

function getInitialItems() {
  return [...initialItems];
}

async function getItemsInDB() {
  const items = await Blog.find({});
  return items.map((item) => item.toJSON());
}

module.exports = {
  getInitialItems,
  getItemsInDB,
};
