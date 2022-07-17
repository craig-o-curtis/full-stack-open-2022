function info(...params) {
  console.info(...params);
}

function log(...params) {
  console.log(...params);
}

function error(...params) {
  console.error(...params);
}

module.exports = {
  info,
  log,
  error,
};
