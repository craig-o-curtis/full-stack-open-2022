const mongoose = require('mongoose');
const urlRegex = require('url-regex');

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
    required: [true, 'Blog url required'],
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const blogApp = mongoose.connection.useDb('blogApp');
const Blog = blogApp.model('Blog', blogSchema);

module.exports = Blog;
