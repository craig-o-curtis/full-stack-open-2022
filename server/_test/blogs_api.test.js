const mongoose = require('mongoose');

// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const app = require('../app');
const { mongoConnection } = require('../utils');
const {
  expectResponseValues,
  blogsHelper,
  usersHelper,
} = require('../testUtils');
const config = require('../utils/config');

const api = supertest(app);
const ENDPOINT_BASE = '/api/blogs';

describe('/api/blogs endpoints', () => {
  const initialItems = blogsHelper.getInitialItems();

  beforeAll(async () => {
    await mongoConnection.connectToMongo();
    console.log('Test suite connected to Mongo');
  }, 10000);

  beforeEach(async () => {
    await usersHelper.clearItemsInDB();
    await blogsHelper.clearItemsInDB();

    const setupUsers = usersHelper.getInitialItems();
    const setupItems = blogsHelper.getInitialItems();
    // ** uses Promise.all
    const userPromises = setupUsers.map((item) =>
      usersHelper.postItemToDB(item)
    );
    const blogPromises = setupItems.map((item) =>
      blogsHelper.postItemToDB(item)
    );
    const allPromises = [...userPromises, ...blogPromises];
    await Promise.all(allPromises);
  }, 10000);

  describe('GET calls blogsApp', () => {
    test('blogs are returned as json', async () => {
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

    test('GET default environment with n initial items', async () => {
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

  describe('GET by id calls blogsApp', () => {
    test('GET by id works', async () => {
      // setup
      const allItems = await blogsHelper.getItemsInDB();
      const firstItemId = allItems[0].id;
      const response = await api
        .get(`${ENDPOINT_BASE}/${firstItemId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(
        initialItems.find((item) => item.title === response.body.title),
        response.body
      );
      expect(response.body.id).toEqual(firstItemId);
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

  describe('POST calls blogsApp', () => {
    test('POST works', async () => {
      // users setup
      const testUsers = await usersHelper.getItemsInDB();
      const firstUserId = testUsers[0].id;
      // setup
      const originalDBItems = await blogsHelper.getItemsInDB();
      const originalDBItemsLength = originalDBItems.length;

      const postItem = {
        title: 'Test Blog3',
        author: 'Pal Buddyfriend',
        url: 'http://localhost:3000',
        likes: 100,
        userId: firstUserId,
      };
      // act
      const postResponse = await api
        .post(ENDPOINT_BASE)
        .send(postItem)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(
        {
          title: postItem.title,
          author: postItem.author,
          url: postItem.url,
          likes: postItem.likes,
        },
        postResponse.body
      );
      expect(postItem.userId).toEqual(postResponse.body.user);
      // reconfirm with GET by id
      const postedItemId = postResponse.body.id;
      // assert
      // ** Confirm blogs updated
      const updatedDBItems = await blogsHelper.getItemsInDB();
      const updatedDBItemsLength = updatedDBItems.length;
      expect(updatedDBItemsLength).toEqual(originalDBItemsLength + 1);
      expect(
        updatedDBItems.some((item) => item.id === postedItemId)
      ).toBeTruthy();
      // ** Confirm user updated
      const updatedUser = await (
        await usersHelper.getItemsInDB()
      ).find((item) => item.id === firstUserId);
      expect(updatedUser.blogs[0].toString()).toEqual(postResponse.body.id);
    });

    test('POST defaults likes to 0', async () => {
      // users setup
      const testUsers = await usersHelper.getItemsInDB();
      const firstUserId = testUsers[0].id;
      // setup
      const postItem = {
        title: 'Test Blog4',
        author: 'Fella Wellwisher',
        url: 'https://www.yankee.com',
        userId: firstUserId,
      };
      // act
      const postResponse = await api
        .post(ENDPOINT_BASE)
        .send(postItem)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      // assert
      expectResponseValues(
        { title: postItem.title, author: postItem.author, url: postItem.url },
        postResponse.body
      );
      expect(postResponse.body.user).toEqual(firstUserId);
      expect(postResponse.body.likes).toEqual(0);
      expect(postResponse.body.id).toBeDefined();

      // ** confirm blogs db
      const updatedDBItems = await blogsHelper.getItemsInDB();
      expect(
        updatedDBItems.find((item) => item.id === postResponse.body.id).likes
      ).toEqual(0);
      // ** confirm users db

      const updatedUser = await (
        await usersHelper.getItemsInDB()
      ).find((item) => item.id === firstUserId);
      expect(updatedUser.blogs[0].toString()).toEqual(postResponse.body.id);
    });

    test('POST rejects malformed data', async () => {
      // users setup
      const testUsers = await usersHelper.getItemsInDB();
      const firstUserId = testUsers[0].id;
      // setup
      const invalidItem1 = {
        title: '',
        author: 'Pal Buddyfriend',
        url: 'http://localhost:3000',
        likes: 100,
        userId: firstUserId,
      };
      const invalidItem2 = {
        title: 'Test Blog3',
        author: '',
        url: 'http://localhost:3000',
        likes: 100,
        userId: firstUserId,
      };
      const invalidItem3 = {
        title: 'Test Blog3',
        author: 'Pal Buddyfriend',
        url: '',
        likes: 100,
        userId: firstUserId,
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

    test('POST rejects duplicate titles', async () => {
      // users setup
      const testUsers = await usersHelper.getItemsInDB();
      const firstUserId = testUsers[0].id;
      // setup
      const itemsInDB = await blogsHelper.getItemsInDB();
      const originalDBItemsLength = itemsInDB.length;
      const firstItemInDB = itemsInDB[0];

      const postItem = {
        title: firstItemInDB.title,
        author: 'A newauthor',
        url: 'www.gooogle.com',
        likes: 2,
        userId: firstUserId,
      };
      // act
      const postResponse = await api
        .post(ENDPOINT_BASE)
        .send(postItem)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      // assert
      expect(postResponse.body.error).toEqual('title already taken.');
      expect(await blogsHelper.getItemsInDB()).toHaveLength(
        originalDBItemsLength
      );
    });
  });

  describe('PUT calls blogsApp', () => {
    test('PUT works', async () => {
      // setup
      const allItems = await blogsHelper.getItemsInDB();
      const firstItemId = allItems[0].id;
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

    test('PUT can update number of likes only', async () => {
      // setup
      const allItems = await blogsHelper.getItemsInDB();
      const firstItem = allItems[0];
      const firstItemId = allItems[0].id;
      const updatedItem = {
        likes: firstItem.likes + 1,
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

      const updatedItems = await blogsHelper.getItemsInDB();
      expect(
        updatedItems.find((item) => item.id === firstItemId).likes
      ).toEqual(firstItem.likes + 1);
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
      const putResponse1 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem1)
        .expect(400);
      const putResponse2 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem2)
        .expect(400);
      const putResponse3 = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(invalidItem3)
        .expect(400);
      // assert
      expect(putResponse1.body.error).toEqual(
        'Validation failed: title: Path `title` is required.'
      );
      expect(putResponse2.body.error).toEqual(
        'Validation failed: author: Path `author` is required.'
      );
      expect(putResponse3.body.error).toEqual(
        'Validation failed: url: Blog url required.'
      );
    });

    test('PUT rejects duplicate titles', async () => {
      // setup
      const itemsInDB = await blogsHelper.getItemsInDB();
      const originalDBItemsLength = itemsInDB.length;
      const firstItemInDB = itemsInDB[0];
      const firstItemId = firstItemInDB.id;

      const putItem = {
        title: firstItemInDB.title,
        author: 'A newauthor',
        url: 'www.gooogle.com',
        likes: 2,
      };
      // act
      const putResponse = await api
        .put(`${ENDPOINT_BASE}/${firstItemId}`)
        .send(putItem)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      // assert
      expect(putResponse.body.error).toEqual('title already taken.');
      expect(await blogsHelper.getItemsInDB()).toHaveLength(
        originalDBItemsLength
      );
    });
  });

  describe('DELETE calls blogsApp', () => {
    test('DELETE works', async () => {
      // setup
      const allItems = await blogsHelper.getItemsInDB();

      for (const item of allItems) {
        await api.delete(`${ENDPOINT_BASE}/${item.id}`).expect(204);
        // confirm with GET
        const confirmAllItemsResponse = await api.get(ENDPOINT_BASE);
        expect(
          confirmAllItemsResponse.body.some((c) => c.id === item.id)
        ).toEqual(false);
        // double-confirm with GET by ID
        await api.get(`${ENDPOINT_BASE}/${item.id}`).expect(404);
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

  afterAll(async () => {
    const testUseresDBName = config.MONGODB_CROSS_APP_DB_TEST;
    const testDBName = config.MONGODB_BLOG_DB_TEST;
    await mongoose.connection.useDb(testDBName).dropCollection('blogs');
    console.log('Dropped db collection', testDBName);
    await mongoose.connection.useDb(testUseresDBName).dropCollection('users');
    console.log('Dropped db collection', testUseresDBName);
    await mongoose.connection.close();
    console.log('Disconnected from test db');
  });
});
