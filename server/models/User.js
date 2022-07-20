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
    // passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

// ?? Connect multiple???
const crossAppDBName =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_CROSS_APP_DB_TEST
    : process.env.MONGODB_CROSS_APP_DB;

// ** Option 1 - seperate db
const crossAppDB = mongoose.connection.useDb(crossAppDBName);
// ** Option 2 - connect at top-level
const superUserDB = mongoose.connect();

// ** Option 1
const CrossAppUser = crossAppDB.model('User', userSchema);
// ** Option 2
const SuperUser = superUserDB.model('User', userSchema);

module.exports = {
  CrossAppUser,
  SuperUser,
};
