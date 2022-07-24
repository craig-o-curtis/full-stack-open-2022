const mongoose = require('mongoose');
const config = require('../utils/config');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
  },
  name: {
    type: String,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    minLength: 10,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // passwordHash should not be revealed
  },
});

const crossAppDBName =
  process.env.NODE_ENV === 'test'
    ? config.MONGODB_CROSS_APP_DB_TEST
    : config.MONGODB_CROSS_APP_DB;

// ** Option 1 - separate db
const crossAppDB = mongoose.connection.useDb(crossAppDBName);
const User = crossAppDB.model('User', userSchema);
// ** Option 2 - connect at top-level

module.exports = User;
