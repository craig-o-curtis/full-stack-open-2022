// const mongoose = require("mongoose");
const { Contact } = require("./models/contact");

// ?? Seems messy to connect to mongoose and not disconnect in Model folder
// const url = process.env.MONGODB_URI || "";

// ** Exported methods
const getDBContacts = async () => {
  try {
    // await mongoose.connect(url);
    // console.log("connected to db");
    // ** {} param for all... because that makes sense
    const contacts = await Contact.find({});
    console.log("contacts", contacts);
    // console.log("closing db connection");
    // mongoose.connection.close();
    return contacts;
  } catch (error) {
    // mongoose.connection.close();
    throw error;
  }
};

const getDBContactById = async (id) => {
  try {
    // await mongoose.connect(url);
    // console.log("connected to db");
    const contact = await Contact.findById(id);

    console.log("returning contact", contact);
    // console.log("closing db connection");
    // mongoose.connection.close();
    return contact;
  } catch (error) {
    // mongoose.connection.close();
    throw error;
  }
};

const postDBContact = async ({ name, number }) => {
  try {
    // await mongoose.connect(url);
    // console.log("connected to db for post");
    const newContact = new Contact({ name, number });
    const createdContact = await newContact.save();
    console.log("Contact created");
    // console.log("closing db connection");
    // mongoose.connection.close();
    return createdContact;
  } catch (error) {
    // mongoose.connection.close();
    throw error;
  }
};

const updateDBContact = async ({ id, name, number }) => {
  try {
    // await mongoose.connect(url);
    // console.log("connected to db for update");
    const contact = await Contact.findByIdAndUpdate(id, {
      name,
      number,
    });

    // ?? need to learn how to update an existing contact in Mongo
    // mongoose.connection.close();
  } catch (error) {
    // mongoose.connection.close();
    throw error;
  }
};

const deleteDBContact = async (id) => {
  // Contact.findByIdAndRemove(id)
  try {
    // await mongoose.connect(url);
    // console.log("connected to db for delete");
    const dbDeletedContact = await Contact.findByIdAndRemove(id);
    console.log("Deleted contact", dbDeletedContact);
    // ?? need to learn how to update an existing contact in Mongo
    // console.log("closing connection on success");
    // mongoose.connection.close();
    return dbDeletedContact;
  } catch (error) {
    // console.log("closing connection on error");
    // mongoose.connection.close();
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
