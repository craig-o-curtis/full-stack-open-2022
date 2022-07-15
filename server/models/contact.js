const mongoose = require("mongoose");

const url = process.env.MONGODB_URI || "";

// ?? Seems unsave to connect this way, should be disconnected, extracted to a function
console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
mongoose.connection.close();

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
