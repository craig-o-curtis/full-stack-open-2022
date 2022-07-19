function checkInvalidIdError(obj) {
  if (obj === null) {
    const error = new Error('Item id does not exist.');
    error.name = 'InvalidIdError';

    throw error;
  }
}

function checkUnsavedItemError(obj) {
  if (obj === null) {
    const error = new Error('Error saving item.');
    error.name = 'SaveItemError';

    throw error;
  }
}

function checkPropertyExistsError(condition, property) {
  if (!condition) return;

  const error = new Error(`Property ${property} already exists.`);
  error.name = 'PropertyExistsError';

  throw error;
}

module.exports = {
  checkInvalidIdError,
  checkUnsavedItemError,
  checkPropertyExistsError,
};
