const contactsRouter = require('express').Router();
const { logger, apiUtils } = require('../utils');
const {
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
} = require('../actions/contacts/');

contactsRouter.get('/', async (request, response) => {
  const dbContacts = await getDBContacts();
  logger.log('Express got contacts', dbContacts);
  response.json(dbContacts);
});

contactsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const dbContact = await getDBContactById(id);
  logger.log('Express got contact', dbContact);

  apiUtils.checkInvalidIdError(dbContact);
  response.json(dbContact);
});

contactsRouter.post('/', async (request, response) => {
  const body = request.body || {};
  const { name, number } = body;
  if (name === undefined || number === undefined) {
    return response
      .status(400)
      .json({ error: `${name === undefined ? 'name' : 'number'}` });
  }

  const dbContacts = await getDBContacts();
  const nameAlreadyExists = dbContacts.find(
    (contact) => contact.name === body.name
  );

  // ** this block is never hit because the dup check is handled in the front-end and we're allowing updating of numbers
  // ** to existing contacts. but just adding this for homework purposes
  apiUtils.checkPropertyExistsError(nameAlreadyExists, 'name');

  const newDBContact = await postDBContact({
    name: body.name,
    number: body.number,
  });

  apiUtils.checkUnsavedItemError(newDBContact);
  logger.log('Express created new contact', newDBContact);
  response.status(201).json(newDBContact);
});

contactsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const { name, number } = body;
  const id = request.params.id;

  const result = await updateDBContact({ id, name, number });
  logger.log('Express updated contact', result);

  apiUtils.checkInvalidIdError(result);
  response.json(result);
});

contactsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedContact = await deleteDBContact(id);

  apiUtils.checkInvalidIdError(deletedContact);
  logger.log('Express deleted contact', deletedContact);
  response.status(204).end();
});

module.exports = contactsRouter;
