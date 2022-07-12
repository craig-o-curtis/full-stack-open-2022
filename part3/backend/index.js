const express = require("express");
const cors = require("cors");
const app = express();

const contacts = require("./contacts.json");
let memoryContacts = [...contacts];

// ** 3.5 would rather use uuid package, but using this method for exercise
const incrementId = () => {
  const maxId =
    memoryContacts.length > 0
      ? Math.max(...memoryContacts.map((n) => n.id))
      : 0;
  return maxId + 1;
};

// ** to allow using localhost:3001
app.use(cors());
// ** to allow request.body to be defined
app.use(express.json());

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

app.post("/api/contacts", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
