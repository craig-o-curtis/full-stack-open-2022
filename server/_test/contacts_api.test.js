const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const Contact = require('../models/Contact');
const { mongoConnection } = require('../utils');
const { expectResponseValues, contactsHelper } = require('../testUtils');

const api = supertest(app);
const ENDPOINT_BASE = '/api/contacts';

describe('/api/contacts endpoints', () => {
  const initialItems = contactsHelper.getInitialItems();

  beforeAll(async () => {
    await mongoConnection.connectToMongo();
    console.log('Test suite connected to Mongo');
  });

  beforeEach(async () => {
    await contactsHelper.clearItemsInDB();
    const setupItems = contactsHelper.getInitialItems();
    // ** uses for of loop
    for (const item of setupItems) {
      const newObject = new Contact(item);
      await newObject.save();
    }
  });

  describe('GET calls phonebookApp', () => {
    test('GET contacts are returned as json', async () => {
      await api
        .get(ENDPOINT_BASE)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('GET contacts have db-generated id', async () => {
      const response = await api.get(ENDPOINT_BASE).expect(200);

      for (const item of response.body) {
        expect(item.id).toBeDefined();
      }
    });

    test('GET default environment with n initial contacts', async () => {
      // setup
      const response = await api.get(ENDPOINT_BASE);
      expect(response.body).toHaveLength(initialItems.length);
      // assert
      for (const [index, apiItem] of response.body.entries()) {
        expectResponseValues(initialItems[index], apiItem);
      }
    });

    test('GET handles incorrect endpoint', async () => {
      await api
        .get(`${ENDPOINT_BASE}incorrect`)
        .expect(404)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('GET by id calls phonebookApp', () => {
    test('GET by id works', async () => {
      // setup
      const allItems = await contactsHelper.getItemsInDB();
      const firstItemId = allItems[0].id;
      const response = await api
        .get(`${ENDPOINT_BASE}/${firstItemId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(initialItems[0], response.body);
    });

    test('GET from invalid id 400 Bad Request', async () => {
      // setup
      const bogusId = '000000000000000000000000';
      // act
      const putResponse = await api
        .get(`${ENDPOINT_BASE}/${bogusId}`)
        .expect(404);
      // assert
      expect(putResponse.body.error).toEqual('Item id does not exist.');
    });

    test('GET to impossible id 404 Not Found', async () => {
      // setup
      const bogusId = 'abc';
      // act
      const putResponse = await api
        .get(`${ENDPOINT_BASE}/${bogusId}`)
        .expect(400);
      // assert
      expect(putResponse.body.error).toEqual('Malformatted id.');
    });
  });

  describe('POST calls phonebookApp', () => {
    test('POST works', async () => {
      // setup
      const originalDBItems = await contactsHelper.getItemsInDB();
      const originalDBItemsLength = originalDBItems.length;

      const postItem = {
        name: 'Test Post Contact',
        number: '+1 800 555 1234',
      };
      // act
      const postResponse = await api
        .post(ENDPOINT_BASE)
        .send(postItem)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(postItem, postResponse.body);
      // reconfirm with GET by id
      const postedItemId = postResponse.body.id;
      // assert
      const getByIdResponse = await api.get(`${ENDPOINT_BASE}/${postedItemId}`);
      expectResponseValues(postItem, getByIdResponse.body);

      const updatedDBItems = await contactsHelper.getItemsInDB();
      const updatedDBItemsLength = updatedDBItems.length;
      expect(updatedDBItemsLength).toEqual(originalDBItemsLength + 1);
    });

    test('POST rejects malformed data', async () => {
      // setup
      const invalidItem1 = {
        name: '',
        number: '+1 800 555 5555',
      };
      const invalidItem2 = {
        name: 'Guy Manboy',
        number: '',
      };
      const invalidItem3 = {
        name: 'Some Dudeguy',
        number: 'abc',
      };
      // act
      const postResponse1 = await api
        .post(ENDPOINT_BASE)
        .send(invalidItem1)
        .expect(400);
      const postResponse2 = await api
        .post(ENDPOINT_BASE)
        .send(invalidItem2)
        .expect(400);
      const postResponse3 = await api
        .post(ENDPOINT_BASE)
        .send(invalidItem3)
        .expect(400);
      // assert
      expect(postResponse1.body.error).toEqual(
        'Contact validation failed: name: Path `name` is required.'
      );
      expect(postResponse2.body.error).toEqual(
        'Contact validation failed: number: User phone number required.'
      );
      expect(postResponse3.body.error).toEqual(
        'Contact validation failed: number: abc is not a valid phone number!'
      );
    });
  });

  describe('PUT calls phonebookApp', () => {
    test('PUT works', async () => {
      // setup
      const allItems = await contactsHelper.getItemsInDB();
      const firstItemId = allItems[0].id;
      const updatedItem = {
        name: 'Test Contact1 Updated',
        number: '+1 555 843 5185',
      };
      // act
      const putResponse = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(updatedItem)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(updatedItem, putResponse.body);
      expect(putResponse.body.id).toEqual(firstItemId);
      // confirm assert
      const getByIdResponse = await api.get(`${ENDPOINT_BASE}/${firstItemId}`);
      expectResponseValues(updatedItem, getByIdResponse.body);
      expect(getByIdResponse.body.id).toEqual(firstItemId);
    });

    test('PUT to invalid id 400 Bad Request', async () => {
      // setup
      const bogusId = '000000000000000000000000';
      const updatedItem = {
        name: 'Test Contact1 Updated',
        number: '+1 555 843 5185',
      };
      // act
      const putResponse = await api
        .put(`${ENDPOINT_BASE}/${bogusId}`)
        .send(updatedItem)
        .expect(404);
      // assert
      expect(putResponse.body.error).toEqual('Item id does not exist.');
    });

    test('PUT to impossible id 404 Not Found', async () => {
      // setup
      const bogusId = 'abc';
      const updatedItem = {
        name: 'Test Contact1 Updated',
        number: '+1 555 843 5185',
      };
      // act
      const putResponse = await api
        .put(`${ENDPOINT_BASE}/${bogusId}`)
        .send(updatedItem)
        .expect(400);
      // assert
      expect(putResponse.body.error).toEqual('Malformatted id.');
    });

    test('PUT rejects malformed data', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const firstItemId = allItemsResponse.body[0].id;

      const invalidItem1 = {
        name: '',
        number: '+1 800 555 5555',
      };
      const invalidItem2 = {
        name: 'Guy Manboy',
        number: '',
      };
      const invalidItem3 = {
        name: 'Some Dudeguy',
        number: 'abc',
      };
      // act
      const postResponse1 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem1)
        .expect(400);
      const postResponse2 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem2)
        .expect(400);
      const postResponse3 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem3)
        .expect(400);
      // assert
      expect(postResponse1.body.error).toEqual(
        'Validation failed: name: Path `name` is required.'
      );
      expect(postResponse2.body.error).toEqual(
        'Validation failed: number: User phone number required.'
      );
      expect(postResponse3.body.error).toEqual(
        'Validation failed: number: abc is not a valid phone number!'
      );
    });
  });

  describe('DELETE calls phonebookApp', () => {
    test('DELETE works', async () => {
      // setup
      const allItems = await contactsHelper.getItemsInDB();

      for (const item of allItems) {
        await api.delete(`${ENDPOINT_BASE}/${item.id}`).expect(204);
        // confirm with GET
        const allContactsResponse = await api.get(ENDPOINT_BASE);
        expect(allContactsResponse.body.some((c) => c.id === item.id)).toEqual(
          false
        );
        // double-confirm with GET by ID
        await api.get(`${ENDPOINT_BASE}/${item.id}`).expect(404);
      }
      // Reconfirm GET all
      const confirmAllResponse = await api.get(ENDPOINT_BASE).expect(200);
      expect(confirmAllResponse.body).toHaveLength(0);
    });

    test('DELETE to invalid id 404 id does not exist', async () => {
      // setup
      const bogusId = '000000000000000000000000';
      // act
      const response = await api
        .delete(`${ENDPOINT_BASE}/${bogusId}`)
        .expect(404);
      // assert
      expect(response.body.error).toEqual('Item id does not exist.');
    });

    test('DELETE to impossible id 400 Not Found', async () => {
      // setup
      const bogusId = 'abc';
      // act
      const response = await api
        .delete(`${ENDPOINT_BASE}/${bogusId}`)
        .expect(400);
      // assert
      expect(response.body.error).toEqual('Malformatted id.');
    });
  });

  afterAll(async () => {
    const testDBName = process.env.MONGODB_PHONEBOOK_DB_TEST;
    await mongoose.connection.useDb(testDBName).dropCollection('contacts');
    console.log('Dropped db collection', testDBName);
    await mongoose.connection.close();
    console.log('Disconnected from test db');
  });
});
