const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const logger = require('./logger');

async function connectToMongo() {
  try {
    logger.log('connecting db');
    await mongoose.connect(MONGODB_URI);
    logger.log('connected to MongoDB');
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message);
  }

  // ?? unsure of connecting and disconnecting to mongo
  // ?? get problems if disconnect on each call
  return async () => {
    await mongoose.connection.close();
    logger.log('disconnected from MongoDB');
  };
}

module.exports = { connectToMongo };
