"use strict";

module.exports = {
  static: {
    port: 8000,
  },
  api: {
    port: 8001,
    transport: "http",
  },
  sandbox: {
    timeout: 5000,
    displayErrors: false,
  },
  db: {
    host: "127.0.0.1",
    port: 5432,
    database: "example",
    user: "marcus",
    password: "marcus",
  },
  metasqlDB: {
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: 5432,
    database: "example",
    user: "marcus",
    password: "marcus",
    console: { debug: () => {} },
  },
  server: {
    port: 8003,
    host: "0.0.0.0",
    protocol: "http",
    cors: {
      origin: "*",
    },
    timeouts: {
      bind: 2000,
      start: 30000,
      stop: 6000,
      request: 5000,
      watch: 1000,
    },
  },
};
