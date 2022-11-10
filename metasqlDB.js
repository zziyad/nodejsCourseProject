"use strict";

const pg = require("pg");
const { Database, Query } = require("metasql");

module.exports = (options) => {
  const db = new Database(options);

  return db;
};
