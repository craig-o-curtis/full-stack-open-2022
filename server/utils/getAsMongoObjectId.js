const mongoose = require('mongoose');

function getAsMongoObjectId(idStr) {
  return mongoose.mongo.BSONPure.ObjectID.fromHexString(idStr);
}

module.exports = getAsMongoObjectId;
