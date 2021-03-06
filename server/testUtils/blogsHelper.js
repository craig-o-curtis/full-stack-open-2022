const Blog = require('../models/Blog');
const sortBy = require('lodash/sortBy');

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
  return sortBy([...initialItems], (item) => item.title);
}

async function clearItemsInDB() {
  await Blog.deleteMany({});
}

async function getItemsInDB() {
  const items = await Blog.find({});
  return sortBy(
    items.map((item) => item.toJSON()),
    (item) => item.title
  );
}

// ** Necessary for methods that require Mongo Object _id
async function getRawItemsInDB() {
  const rawBlogs = await Blog.find({});
  return sortBy(rawBlogs, (item) => item.title);
}

module.exports = {
  getInitialItems,
  getItemsInDB,
  clearItemsInDB,
  getRawItemsInDB,
};
