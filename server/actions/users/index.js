const getDBUsers = require('./getDBUsers');
const getDBUserById = require('./getDBUserById');
const postDBUser = require('./postDBUser');
const updateDBUser = require('./updateDBUser');
const deleteDBUser = require('./deleteDBUser');
// utils
const checkPropertyExists = require('./checkPropertyExists');

module.exports = {
  getDBUsers,
  getDBUserById,
  postDBUser,
  updateDBUser,
  deleteDBUser,
  checkPropertyExists,
};
