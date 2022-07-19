function handleInvalidIdError(obj) {
  if (obj === null) {
    // response.status(404).json({ error: 'Item id does not exist.' }).end();
    const error = new Error('Item id does not exist.');
    error.name = 'InvalidIdError';

    throw error;
  }
}

module.exports = {
  handleInvalidIdError,
};
