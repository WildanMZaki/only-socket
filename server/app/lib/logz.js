const { Logz } = require("wizelib");

const logz = new Logz({
  path: "./server/storage/logs/",
});

module.exports = { logz };
