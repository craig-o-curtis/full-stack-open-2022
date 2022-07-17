const app = require('./app');
const http = require('http');

const { logger, config, mongoConnection } = require('./utils');

let disconnectMongo = undefined;

const server = http.createServer(app);

server.listen(config.PORT, async () => {
  disconnectMongo = await mongoConnection.connectToMongo();
  logger.log(`Server running on port ${config.PORT}`);
});

// ?? unsure if this is setup
process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    await disconnectMongo();
    logger.log('HTTP server closed');
  });
});
