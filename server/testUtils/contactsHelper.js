const Contact = require('../models/Contact');

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
  return [...initialItems];
}

async function getItemsInDB() {
  const items = await Contact.find({});
  return items.map((item) => item.toJSON());
}

module.exports = {
  getInitialItems,
  getItemsInDB,
};
