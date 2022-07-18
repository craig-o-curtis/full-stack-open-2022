const getDBContacts = require('./getDBContacts');
const getDBContactById = require('./getDBContactById');
const postDBContact = require('./postDBContact');
const updateDBContact = require('./updateDBContact');
const deleteDBContact = require('./deleteDBContact');

module.exports = {
  getDBContacts,
  getDBContactById,
  postDBContact,
  updateDBContact,
  deleteDBContact,
};
