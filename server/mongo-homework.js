const mongoose = require("mongoose");

const run = async () => {
  if (process.argv.length < 3) {
    console.log(
      "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
  }
  // ** cmd line args
  const password = process.argv[2];
  const uriEncodedPassword = encodeURIComponent(password);
  const cmdlineName = process.argv[3];
  const cmdlineNumber = process.argv[4];

  const url = `mongodb+srv://fullstack:${uriEncodedPassword}@cluster0.16byzrz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

  const contactsSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Contact = mongoose.model("Contact", contactsSchema);

  // ** Methods
  const getContacts = async () => {
    try {
      await mongoose.connect(url);
      console.log("connected to db");
      // ** {} param for all... because that makes sense
      const contacts = await Contact.find({});
      contacts.forEach((contact) => {
        console.log("contact", contact);
      });
      console.log("closing db connection");
      mongoose.connection.close();
      return contacts;
    } catch (error) {
      mongoose.connection.close();
      throw error;
    }
  };

  const getContactById = async (id) => {
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

  const saveContact = async ({ name, number }) => {
    try {
      await mongoose.connect(url);
      console.log("connected to db for save");

      const newContact = new Contact({ name, number });

      await newContact.save();
      console.log("Contact saved");
      console.log("closing db connection");
      mongoose.connection.close();
    } catch (error) {
      mongoose.connection.close();
      throw error;
    }
  };

  // ** Exercise 3.c 3.12
  // ** Goal: node mongo.js <pw> <name> <number>
  // ** Goal: node mongo.js <pw> > shows get call
  const assignment312MockAdd = async () => {
    console.log("got name: ", cmdlineName);
    console.log("got number: ", cmdlineNumber);
    try {
      await mongoose.connect(url);
      console.log("connected to db for save");
      const newContact = new Contact({
        name: cmdlineName,
        number: cmdlineNumber,
      });

      await newContact.save();

      console.log(`Added ${cmdlineName} number ${cmdlineNumber} to phonebook`);
      console.log("closing db connection");
      mongoose.connection.close();
    } catch (error) {
      mongoose.connection.close();
      throw error;
    }
  };

  // ** Run program
  if (cmdlineName !== undefined && cmdlineNumber !== undefined) {
    console.log("runnng add to db");
    await assignment312MockAdd();
  }
  if (cmdlineName === undefined && cmdlineNumber === undefined) {
    console.log("running get from db");
    await getContacts();
  }

  process.exit(0);
};

run();

exports = {
  getContacts,
  getContactById,
  saveContact,
};
