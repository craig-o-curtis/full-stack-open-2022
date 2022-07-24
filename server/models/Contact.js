const mongoose = require('mongoose');
const { isPossiblePhoneNumber } = require('libphonenumber-js');
const config = require('../utils/config');

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    validate: {
      validator: (value) => {
        // ** use same validation FE and BE for consistency
        return isPossiblePhoneNumber(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required.'],
  },
  // TODO add tests for adding user for POST and PUT
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const dbName =
  process.env.NODE_ENV === 'test'
    ? config.MONGODB_PHONEBOOK_DB_TEST
    : config.MONGODB_PHONEBOOK_DB;

const phonebookAppDB = mongoose.connection.useDb(dbName);
const Contact = phonebookAppDB.model('Contact', contactSchema);

module.exports = Contact;
