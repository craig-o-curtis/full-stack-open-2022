const contactsRouter = require('express').Router();
const { logger } = require('../utils');
const {
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
} = require('../actions');

contactsRouter.get('/', async (request, response) => {
  try {
    const dbContacts = await getDBContacts();
    logger.log('Express got contacts', dbContacts);
    response.json(dbContacts);
  } catch (error) {
    logger.error(error);
    response.status(404).end();
  }
});

contactsRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const dbContact = await getDBContactById(id);
    logger.log('Express got contact', dbContact);
    if (dbContact === null) {
      response.status(404).end();
    }
    response.json(dbContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post('/', async (request, response, next) => {
  try {
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
    if (nameAlreadyExists) {
      return response
        .status(400)
        .json({
          error: 'Name already exists',
        })
        .end();
    }

    const newDBContact = await postDBContact({
      name: body.name,
      number: body.number,
    });
    logger.log('Express created new contact: ', newDBContact);
    response.json(newDBContact);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;
    const { name, number } = body;
    const id = request.params.id;

    logger.log('about to update with id: ', id);
    const result = await updateDBContact({ id, name, number });
    logger.log('Express updated contact result', result);
    if (result === null) {
      response.status(404).end();
    }
    response.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const deletedContact = await deleteDBContact(id);
    logger.log('Express deleted contact', deletedContact);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = contactsRouter;
