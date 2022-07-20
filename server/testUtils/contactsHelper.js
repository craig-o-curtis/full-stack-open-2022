const Contact = require('../models/Contact');
const sortBy = require('lodash/sortBy');

const initialItems = [
  {
    name: 'Test Contact1',
    number: '+48 62155548',
  },
  {
    name: 'Test Contact2',
    number: '+53 23 43234',
  },
];

function getInitialItems() {
  return sortBy([...initialItems], (item) => item.name);
}

async function clearItemsInDB() {
  await Contact.deleteMany({});
}

async function getItemsInDB() {
  const items = await Contact.find({});
  return sortBy(
    items.map((item) => item.toJSON()),
    (item) => item.name
  );
}

module.exports = {
  getInitialItems,
  getItemsInDB,
  clearItemsInDB,
};
