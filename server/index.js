require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { v4: uuidv4 } = require("uuid");

const {
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
} = require("./mongo");

// debugger;
// ** to allow using localhost:3001
app.use(cors());
app.use(express.json());
// ** 3.9 serve static assets
app.use(express.static("build"));
// ** to allow request.body to be defined
// ** 3.8
morgan.token("id", function getId(req) {
  return req.id;
});
morgan.token("body", (req, res) => JSON.stringify(req.body));

// ** utils
function assignId(req, res, next) {
  req.id = uuidv4();
  next();
}

app.use(assignId);
app.use(
  morgan(`
   ***** MORGANFREEMAN *****
    METHOD:          :method 
    URL:             :url 
    STATUS:          :status 
    RESPONSE TIME:   :response-time 
    TOTAL TIME:      :total-time
    REQ BODY:        :body
  `)
);

app.get("/", (request, response) => {
  response.status(404).end();
});

app.get("/info", async (request, response) => {
  try {
    const contacts = await getDBContacts();
    response
      .send(
        `
    <h1>Info page</h1>
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}</p>
  `
      )
      .end();
  } catch (error) {
    response.status(404).end();
    mongoose.connection.close();
  }
});

app.get("/api", (request, response) => {
  response.status(404).end();
});

//** GET all */
app.get("/api/contacts", async (request, response) => {
  try {
    const dbContacts = await getDBContacts();
    response.json(dbContacts);
  } catch (error) {
    console.error(error);
    response.status(404).end();
  }
});

//** GET by id */
app.get("/api/contacts/:id", async (request, response) => {
  try {
    const id = request.params.id;
    console.log("got id", id);
    const dbContact = await getDBContactById(id);
    console.log("got contact...", dbContact);
    response.json(dbContact);
  } catch (error) {
    console.error(error);
    response.status(404).end();
  }
});

//** POST new contact */
app.post("/api/contacts", async (request, response) => {
  try {
    const body = request.body || {};
    const { name, number } = body;
    if (name === undefined || number === undefined) {
      return response
        .status(400)
        .json({ error: `${name === undefined ? "name" : "number"}` });
    }

    const dbContacts = await getDBContacts();
    const nameAlreadyExists = dbContacts.find(
      (contact) => contact.name === body.name
    );

    // ** this block is never hit because the dup check is handled in the front-end and we're allowing updating of numbers
    // ** to existing contacts. but just adding this for homework purposes
    if (nameAlreadyExists) {
      return response
        .status(400)
        .json({
          error: "Name already exists",
        })
        .end();
    }

    if (!body.name || !body.number) {
      return response
        .status(400)
        .json({
          error: `${body?.name === undefined ? "name" : "number"} missing`,
        })
        .end();
    }

    const newDBContact = await postDBContact({
      name: body.name,
      number: body.number,
    });
    console.log("created new contact: ", newDBContact);
    response.json(newDBContact);
  } catch (error) {
    console.error(error);
    response.status(404).end();
  }
});

//** UPDATE? existing */
// ?? should this be a patch or put call if updating
app.patch("/api/contacts/:id", async (request, response) => {
  try {
    const body = request.body;
    const { name, number } = body;
    const id = request.params.id;
    const contacts = await getDBContacts();
    const contact = contacts.find((contact) => contact.id === id);

    // TODO throw specific errors if

    if (contact === undefined) {
      response.status(404).end();
      return;
    }

    const result = await updateDBContact({ id, name, number });

    // TODO Mongo action to update an existing contact
    response.json(contact);
  } catch (error) {
    console.error(error);
    response.status(404).end();
  }
});

// ** 3.4 tested in Postman, VSCode rest thingy, and UI
app.delete("/api/contacts/:id", async (request, response) => {
  try {
    const id = request.params.id;
    // TODO need to figure out how to delete DB contact
    const result = await deleteDBContact(id);
    // 204 no content status code
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(404).end();
  }
});

// ** Order matters for routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
