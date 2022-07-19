const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const { mongoConnection } = require('../utils');
const { expectResponseValues } = require('../testUtils');

const api = supertest(app);
const ENDPOINT_BASE = '/api/blogs';

const initialItems = [
  {
    title: 'Test Blog1',
    author: 'Guy Dudeman',
    url: 'www.example.com',
    likes: 1,
  },
  {
    title: 'Test Blog2',
    author: 'Man Boyson',
    url: 'www.google.com',
    likes: 2,
  },
];

describe('/api/blogs endpoints', () => {
  beforeAll(async () => {
    await mongoConnection.connectToMongo();
    console.log('Test suite connected to Mongo');
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    const initialItem1 = new Blog(initialItems[0]);
    const initialItem2 = new Blog(initialItems[1]);

    await initialItem1.save();
    await initialItem2.save();
  });

  describe('GET calls', () => {
    test('blogs are returned as json', async () => {
      await api
        .get(ENDPOINT_BASE)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('GET default environment with 2 initial items', async () => {
      // setup
      const response = await api.get(ENDPOINT_BASE);
      expect(response.body).toHaveLength(initialItems.length);
      // assert
      for (const [index, apiItem] of response.body.entries()) {
        expectResponseValues(initialItems[index], apiItem);
      }
    });

    test('GET all handles incorrect endpoint', async () => {
      await api
        .get(`${ENDPOINT_BASE}incorrect`)
        .expect(404)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('GET by id calls', () => {
    test('GET by id works', async () => {
      // setup
      const itemsResponse = await api.get(ENDPOINT_BASE);
      const firstItemId = itemsResponse.body?.[0]?.id;
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
        title: 'Test Blog3',
        author: 'Pal Buddyfriend',
        url: 'http://localhost:3000',
        likes: 100,
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
      const invalidItem1 = {
        title: '',
        author: 'Pal Buddyfriend',
        url: 'http://localhost:3000',
        likes: 100,
      };
      const invalidItem2 = {
        title: 'Test Blog3',
        author: '',
        url: 'http://localhost:3000',
        likes: 100,
      };
      const invalidItem3 = {
        title: 'Test Blog3',
        author: 'Pal Buddyfriend',
        url: '',
        likes: 100,
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
        'Blog validation failed: title: Path `title` is required.'
      );
      expect(postResponse2.body.error).toEqual(
        'Blog validation failed: author: Path `author` is required.'
      );
      expect(postResponse3.body.error).toEqual(
        'Blog validation failed: url: Blog url required.'
      );
    });
  });

  describe('PUT calls', () => {
    test('PUT works', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const firstItemId = allItemsResponse.body[0].id;
      const updatedItem = {
        title: 'Test Blog1 Updated',
        author: 'Another Guy',
        url: 'www.google.com',
        likes: 2,
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
        title: 'Test Blog1 Updated',
        author: 'Another Guy',
        url: 'www.google.com',
        likes: 2,
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
        title: 'Test Blog1 Updated',
        author: 'Another Guy',
        url: 'www.google.com',
        likes: 2,
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
        title: '',
        author: 'Pal Buddyfriend',
        url: 'http://localhost:3000',
        likes: 100,
      };
      const invalidItem2 = {
        title: 'Test Blog3',
        author: '',
        url: 'http://localhost:3000',
        likes: 100,
      };
      const invalidItem3 = {
        title: 'Test Blog3',
        author: 'Pal Buddyfriend',
        url: '',
        likes: 100,
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
        'Validation failed: title: Path `title` is required.'
      );
      expect(postResponse2.body.error).toEqual(
        'Validation failed: author: Path `author` is required.'
      );
      expect(postResponse3.body.error).toEqual(
        'Validation failed: url: Blog url required.'
      );
    });
  });

  describe('DELETE calls', () => {
    test('DELETE works', async () => {
      // setup
      const allItemsResponse = await api.get(ENDPOINT_BASE);
      const allItems = allItemsResponse.body;

      for (const contact of allItems) {
        await api.delete(`${ENDPOINT_BASE}/${contact.id}`).expect(204);
        // confirm with GET
        const confirmAllItemsResponse = await api.get(ENDPOINT_BASE);
        expect(
          confirmAllItemsResponse.body.some((c) => c.id === contact.id)
        ).toEqual(false);
        // double-confirm with GET by ID
        await api.get(`${ENDPOINT_BASE}/${contact.id}`).expect(404);
      }
      // Reconfirm GET all
      const reconfirmAllResponse = await api.get(ENDPOINT_BASE).expect(200);
      expect(reconfirmAllResponse.body).toHaveLength(0);
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

  afterAll(() => {
    mongoose.connection.close();
  });
});
