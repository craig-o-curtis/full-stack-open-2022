const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const logger = require('./logger');

async function connectToMongo() {
  const promise = new Promise((resolve, reject) => {
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;

    db.on('error', (error) => {
      logger.error(error);
      reject(error);
    });

    db.once('open', () => {
      logger.log('connected to db');
      resolve(db);
    });
  });

  return await promise;
}

module.exports = { connectToMongo };
