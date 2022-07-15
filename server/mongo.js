const mongoose = require("mongoose");
const { Contact } = require("./models/contact");

const url = process.env.MONGODB_URI || "";

// ** Exported methods
const getDBContacts = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
    // ** {} param for all... because that makes sense
    const contacts = await Contact.find({});
    console.log("contacts", contacts);
    console.log("closing db connection");
    mongoose.connection.close();
    return contacts;
  } catch (error) {
    // ?? Is this correct to close on catch?
    // ?? is this correct to throw error this way?
    mongoose.connection.close();
    throw error;
  }
};

const getDBContactById = async (id) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db");
    const contact = await Contact.find({ _id: id });
    console.log("returning contact", contact);
    console.log("closing db connection");
    mongoose.connection.close();
    return contact;
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};

const postDBContact = async ({ name, number }) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db for post");

    const newContact = new Contact({ name, number });

    await newContact.save();
    console.log("Contact saved");
    console.log("closing db connection");
    mongoose.connection.close();
    return newContact;
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};

const updateDBContact = async ({ id, name, number }) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db for update");
    const contact = await Contact.find({ _id: id });

    // ?? need to learn how to update an existing contact in Mongo
    mongoose.connection.close();
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};

const deleteDBContact = async ({ id }) => {
  try {
    await mongoose.connect(url);
    console.log("connected to db for delete");
    const contact = await Contact.find({ _id: id });

    // ?? need to learn how to update an existing contact in Mongo
    mongoose.connection.close();
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};

module.exports = {
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
};
