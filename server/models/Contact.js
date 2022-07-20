const mongoose = require('mongoose');
const { isPossiblePhoneNumber } = require('react-phone-number-input');

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
    ? process.env.MONGODB_PHONEBOOK_DB_TEST
    : process.env.MONGODB_PHONEBOOK_DB;

const phonebookAppDB = mongoose.connection.useDb(dbName);
const Contact = phonebookAppDB.model('Contact', contactSchema);

module.exports = Contact;
