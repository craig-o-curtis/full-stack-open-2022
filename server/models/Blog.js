const mongoose = require('mongoose');
const urlRegex = require('url-regex-safe');
const config = require('../utils/config');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    required: true,
  },
  author: {
    type: String,
    minLength: 1,
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: (value) => {
        return urlRegex({ exact: true }).test(value);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
    required: [true, 'Blog url required.'],
  },
  likes: Number,
  // TODO add tests for adding user for POST and PUT
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const dbName =
  process.env.NODE_ENV === 'test'
    ? config.MONGODB_BLOG_DB_TEST
    : config.MONGODB_BLOG_DB;

const blogApp = mongoose.connection.useDb(dbName);
const Blog = blogApp.model('Blog', blogSchema);

module.exports = Blog;
