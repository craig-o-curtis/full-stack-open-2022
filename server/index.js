const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');

const { logger, config, mongoConnection } = require('./utils');

const server = http.createServer(app);

server.listen(config.PORT, async () => {
  await mongoConnection.connectToMongo();
  logger.log(`Server running on port ${config.PORT}`);
});

// ?? unsure if this is setup
process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    mongoose.connection.close();
    logger.log('HTTP server closed');
  });
});
