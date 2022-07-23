require('dotenv-flow').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
// ** Users
const MONGODB_CROSS_APP_DB = process.env.MONGODB_CROSS_APP_DB;
const MONGODB_CROSS_APP_DB_TEST = process.env.MONGODB_CROSS_APP_DB_TEST;
// ** Blog app
const MONGODB_BLOG_DB = process.env.MONGODB_BLOG_DB;
const MONGODB_BLOG_DB_TEST = process.env.MONGODB_BLOG_DB_TEST;
// ** Phonebook app
const MONGODB_PHONEBOOK_DB = process.env.MONGODB_PHONEBOOK_DB;
const MONGODB_PHONEBOOK_DB_TEST = process.env.MONGODB_PHONEBOOK_DB_TEST;
// ** login secret
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGODB_URI,
  MONGODB_CROSS_APP_DB,
  MONGODB_CROSS_APP_DB_TEST,
  MONGODB_BLOG_DB,
  MONGODB_BLOG_DB_TEST,
  MONGODB_PHONEBOOK_DB,
  MONGODB_PHONEBOOK_DB_TEST,
  PORT,
  JWT_SECRET,
};
