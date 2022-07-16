const mongoose = require("mongoose");
const { Contact } = require("./models/contact");

const url = process.env.MONGODB_URI || "";

async function connectToMongo() {
  try {
    console.log("connecting db");
    await mongoose.connect(url);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
  }

  // ?? unsure of connecting and disconnecting to mongo
  // ?? get problems if disconnect on each call
  return async () => {
    await mongoose.connection.close();
    console.log("disconnected from MongoDB");
  };
}

// ** Exported methods
const getDBContacts = async () => {
  try {
    // ** {} param for all... because that makes sense
    const contacts = await Contact.find({});
    console.log("contacts", contacts);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getDBContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    console.log("returning contact", contact);
    return contact;
  } catch (error) {
    throw error;
  }
};

const postDBContact = async ({ name, number }) => {
  try {
    const newContact = new Contact({ name, number });
    const createdContact = await newContact.save();
    console.log("Contact created", createdContact);
    return createdContact;
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};

const updateDBContact = async ({ id, name, number }) => {
  try {
    const updateDBContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        number,
      },
      { new: true }
    );
    console.log("updatedContact", updateDBContact);
    return updateDBContact;
  } catch (error) {
    throw error;
  }
};

const deleteDBContact = async (id) => {
  try {
    const dbDeletedContact = await Contact.findByIdAndRemove(id);
    console.log("Deleted contact", dbDeletedContact);
    return dbDeletedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connectToMongo,
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
};
