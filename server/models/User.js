const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    minLength: 10,
    required: true,
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
    ? process.env.MONGODB_CROSS_APP_DB_TEST
    : process.env.MONGODB_CROSS_APP_DB;

// ** Option 1 - separate db
const crossAppDB = mongoose.connection.useDb(crossAppDBName);
const User = crossAppDB.model('User', userSchema);
// ** Option 2 - connect at top-level
// const superUserDB = mongoose.connect();
// const SuperUser = superUserDB.model('User', userSchema);

module.exports = User;
