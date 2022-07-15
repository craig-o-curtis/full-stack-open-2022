const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv-flow").config();
const morgan = require("morgan");
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
// ** 3.9 serve static assets
app.use(express.static("build"));
app.use(express.json());

// ** to allow request.body to be defined
// ** 3.8
morgan.token("id", function getId(req) {
  return req.id;
});
morgan.token("body", (req, res) => JSON.stringify(req.body));

// ** utils
// ** For morgan plugin
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
app.get("/api/contacts/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const dbContact = await getDBContactById(id);

    if (dbContact === null) {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

//** POST new contact */
app.post("/api/contacts", async (request, response, next) => {
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
    next(error);
  }
});

//** UPDATE? existing */
// ?? should this be a patch or put call if updating
app.patch("/api/contacts/:id", async (request, response, next) => {
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
    if (result === null) {
      response.status(404).end();
    }

    // TODO Mongo action to update an existing contact
    response.json(contact);
  } catch (error) {
    next(error);
  }
});

// ** 3.4 tested in Postman, VSCode rest thingy, and UI
app.delete("/api/contacts/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    console.log("GOT ID: ", id);
    // TODO need to figure out how to delete DB contact
    const deletedContact = await deleteDBContact(id);
    console.log("deleted contact", deletedContact);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// ** Order matters for routes
function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

// ** last loaded middleware - error handler
// ** error handling middleware
function errorHandler(error, request, response, next) {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
