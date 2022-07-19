function expectResponseValues(expectedObj, responseBody) {
  for (const [expectedKey, expectedValue] of Object.entries(expectedObj)) {
    expect(responseBody[expectedKey]).toEqual(expectedValue);
  }
}

module.exports = expectResponseValues;
