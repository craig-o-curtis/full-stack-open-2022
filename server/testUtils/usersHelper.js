const User = require('../models/User');
const bcrypt = require('bcrypt');
const sortBy = require('lodash/sortBy');

const initialItems = [
  {
    username: 'guy_dudeman',
    name: 'Guy Dudeman',
    password: 'sekret',
  },
  {
    username: 'mark_it_zero',
    name: 'Walter Sobchak',
    password: 'stfudonnie',
  },
];

function getInitialItems() {
  return sortBy([...initialItems], (item) => item.username);
}

async function getItemsInDB() {
  const items = await User.find({});
  return sortBy(
    items.map((item) => item.toJSON()),
    (item) => item.username
  );
}

// ** Necessary for methods that require Mongo Object _id
async function getRawItemsInDB() {
  const rawUsers = await User.find({});
  return sortBy(rawUsers, (item) => item.username);
}

async function clearItemsInDB() {
  await User.deleteMany({});
}

// ** Method for new users
// ** username, name, password
async function postItemToDB(item) {
  const passwordHash = await bcrypt.hash(item.password, 10);

  const newObject = new User({
    username: item.username,
    name: item.name,
    passwordHash,
    contacts: [],
    blogs: [],
  });

  await newObject.save();
}

module.exports = {
  getInitialItems,
  getItemsInDB,
  getRawItemsInDB,
  clearItemsInDB,
  postItemToDB,
};
