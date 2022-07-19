const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const Contact = require('../models/Contact');
const { mongoConnection } = require('../utils');
const { expectResponseValues } = require('../testUtils');

const api = supertest(app);
const ENDPOINT_BASE = '/api/contacts';

const initialItems = [
  {
    name: 'Test Contact1',
    number: '+48 62155548',
  },
  {
    name: 'Test Contact2',
    number: '+53 23 43234',
  },
];

describe('/api/contacts endpoints', () => {
  beforeAll(async () => {
    await mongoConnection.connectToMongo();
    console.log('Test suite connected to Mongo');
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
    const initialItem1 = new Contact(initialItems[0]);
    const initialItem2 = new Contact(initialItems[1]);

    await initialItem1.save();
    await initialItem2.save();
  });

  describe('GET calls', () => {
    test('GET contacts are returned as json', async () => {
      await api
        .get(ENDPOINT_BASE)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('GET default environment with 2 initial contacts', async () => {
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

  describe('GET by id calls', () => {
    test('GET by id works', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const firstItemId = allItemsResponse.body?.[0]?.id;
      const response = await api.get(`${ENDPOINT_BASE}/${firstItemId}`);
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

  describe('POST calls', () => {
    test('POST works', async () => {
      // setup
      const postItem = {
        name: 'Test Post Contact',
        number: '+1 800 555 1234',
      };
      // act
      const postResponse = await api
        .post(ENDPOINT_BASE)
        .send(postItem)
        .expect(201);
      // assert
      expectResponseValues(postItem, postResponse.body);
      // reconfirm with GET by id
      const postedItemId = postResponse.body.id;
      // assert
      const getByIdResponse = await api.get(`${ENDPOINT_BASE}/${postedItemId}`);
      expectResponseValues(postItem, getByIdResponse.body);
    });

    test('POST rejects malformed data', async () => {
      // setup
      const invalidPostItem1 = {
        name: '',
        number: '+1 800 555 5555',
      };
      const invalidPostItem2 = {
        name: 'Guy Manboy',
        number: '',
      };
      const invalidPostItem3 = {
        name: 'Some Dudeguy',
        number: 'abc',
      };
      // act
      const postResponse1 = await api
        .post(ENDPOINT_BASE)
        .send(invalidPostItem1)
        .expect(400);
      const postResponse2 = await api
        .post(ENDPOINT_BASE)
        .send(invalidPostItem2)
        .expect(400);
      const postResponse3 = await api
        .post(ENDPOINT_BASE)
        .send(invalidPostItem3)
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

  describe('PUT calls', () => {
    test('PUT works', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const firstItemId = allItemsResponse.body?.[0]?.id;
      const updatedItem = {
        name: 'Test Contact1 Updated',
        number: '+1 555 843 5185',
      };
      // act
      const putResponse = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(updatedItem)
        .expect(200);
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
  });

  describe('DELETE calls', () => {
    test('DELETE works', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const allItems = allItemsResponse.body;

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
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
