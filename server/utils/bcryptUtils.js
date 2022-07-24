const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function encrypt(raw, salt) {
  const saltRounds = salt || SALT_ROUNDS;
  return await bcrypt.hash(raw, saltRounds);
}

async function isMatch(raw, hash) {
  return await bcrypt.compare(raw, hash);
}

module.exports = {
  encrypt,
  isMatch,
};
