const mongoose = require('mongoose');
const { Contact } = require('./models/contact');
const url = process.env.MONGODB_URI || '';

async function connectToMongo() {
  try {
    console.log('connecting db');
    await mongoose.connect(url);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message);
  }

  // ?? unsure of connecting and disconnecting to mongo
  // ?? get problems if disconnect on each call
  return async () => {
    await mongoose.connection.close();
    console.log('disconnected from MongoDB');
  };
}

// ** Exported methods
const getDBContacts = async () => {
  // ** {} param for all... because that makes sense
  const contacts = await Contact.find({});
  console.log('MongoDB returning contacts', contacts);
  return contacts;
};

const getDBContactById = async (id) => {
  const contact = await Contact.findById(id);
  console.log('MongoDB returning contact', contact);
  return contact;
};

const postDBContact = async ({ name, number }) => {
  const newContact = new Contact({ name, number });
  const createdContact = await newContact.save();
  console.log('MongoDB Contact created', createdContact);
  return createdContact;
};

// ** Part 3.c Exercise 3.17 confirm uses put call
const updateDBContact = async ({ id, name, number }) => {
  const updateDBContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      number,
    },
    { new: true, runValidators: true, context: 'query' }
  );
  console.log('MongoDB updated contact', updateDBContact);
  return updateDBContact;
};

const deleteDBContact = async (id) => {
  const dbDeletedContact = await Contact.findByIdAndRemove(id);
  console.log('MongoDB deleted contact', dbDeletedContact);
  return dbDeletedContact;
};

module.exports = {
  connectToMongo,
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
};
