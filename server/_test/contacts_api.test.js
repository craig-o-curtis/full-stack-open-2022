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

  test('contacts are returned as json', async () => {
    await api
      .get(ENDPOINT_BASE)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('GET default environment with 2 initial contacts', async () => {
    // setup
    const response = await api.get(ENDPOINT_BASE);
    expect(response.body).toHaveLength(2);
    // assert
    for (const [index, apiItem] of response.body.entries()) {
      expectResponseValues(initialItems[index], apiItem);
    }
  });

  test('GET by id works', async () => {
    // setup
    const allItemsResponse = await api.get(ENDPOINT_BASE);
    const firstItemId = allItemsResponse.body?.[0]?.id;
    const response = await api.get(`${ENDPOINT_BASE}/${firstItemId}`);
    // assert
    expectResponseValues(initialItems[0], response.body);
  });

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
      .expect(200);
    // assert
    expectResponseValues(postItem, postResponse.body);
    // reconfirm with GET by id
    const postedItemId = postResponse.body.id;
    // assert
    const getByIdResponse = await api.get(`${ENDPOINT_BASE}/${postedItemId}`);
    expectResponseValues(postItem, getByIdResponse.body);
  });

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

  afterAll(() => {
    mongoose.connection.close();
  });
});
