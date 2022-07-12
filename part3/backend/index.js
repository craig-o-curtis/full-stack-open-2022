const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

const contacts = require("./contacts.json");
let memoryContacts = [...contacts];

// ** 3.7
const requestLogger = (request, response, next) => {
  console.log("Request Method:", request.method);
  console.log("Request Path:  ", request.path);
  console.log("Request Body:  ", request.body);
  console.log("---");
  next();
};

// ** 3.5 would rather use uuid package, but using this method for exercise
const incrementId = () => {
  const maxId =
    memoryContacts.length > 0
      ? Math.max(...memoryContacts.map((n) => n.id))
      : 0;
  return maxId + 1;
};

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// ** to allow using localhost:3001
app.use(cors());
// ** to allow request.body to be defined
app.use(express.json());
// ** 3.7 "middleware"
app.use(requestLogger);
// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

app.get("/", (request, response) => {
  response.status(404).end();
});

app.get("/info", (request, response) => {
  response
    .send(
      `
    <h1>Info page</h1>
    <p>Phonebook has info for ${memoryContacts.length} people</p>
    <p>${new Date()}</p>
  `
    )
    .end();
});

app.get("/api", (request, response) => {
  response.status(404).end();
});

app.get("/api/contacts", (request, response) => {
  response.json(memoryContacts);
});

app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  const contact = memoryContacts.find((contact) => contact.id === id);

  // **
  if (contact === undefined) {
    response.status(404).end();
    return;
  }

  response.json(contact);
});

app.patch("/api/contacts/:id", (request, response) => {
  const body = request.body;
  const id = Number(request.params.id);
  const contact = memoryContacts.find((contact) => contact.id === id);

  if (contact === undefined) {
    response.status(404).end();
    return;
  }

  memoryContacts = memoryContacts
    .filter((contact) => contact.id !== id)
    .concat({
      id: contact.id,
      name: body.name,
      number: body.number,
    });

  response.json(contact);
});

// ** exercise 3.6 - this is at odds with the patch call for updating phone numbers and all the associated code
// ** so for this exercise, just adding the never-hit block of code for homwork purposes
app.post("/api/contacts", (request, response) => {
  const body = request.body;
  const nameAlreadyExists = memoryContacts.find(
    (contact) => contact.name === body.name
  );

  // ** this block is never hit because the dup check is handled in the front-end and we're allowing updating of numbers
  // ** to existing contacts. but just adding this for homework purposes
  if (nameAlreadyExists) {
    return response.status(400).json({
      error: "Name already exists",
    });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: `${body?.name === undefined ? "name" : "number"} missing`,
    });
  }
  // ** The name or number is missing
  // ** The name already exists in the phonebook

  const contact = {
    name: body.name,
    number: body.number,
    id: incrementId(),
  };

  memoryContacts = memoryContacts.concat(contact);

  response.json(contact);
});

// ** 3.4 tested in Postman, VSCode rest thingy, and UI
app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  memoryContacts = memoryContacts.filter((contact) => contact.id !== id);
  // 204 no content status code
  response.status(204).end();
});

// ** 3.7
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
