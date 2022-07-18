const app = require('./app');
const http = require('http');

const { logger, config, mongoConnection } = require('./utils');

let disconnectMongo;

const server = http.createServer(app);

server.listen(config.PORT, async () => {
  disconnectMongo = await mongoConnection.connectToMongo();
  logger.log(`Server running on port ${config.PORT}`);
});

// ?? unsure if this is setup
process.on('SIGTERM', () => {
  logger.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    disconnectMongo.connection.close();
    logger.log('HTTP server closed');
  });
});
