const logger = require("./logger.js");
const config = require("./config.js");
const { Server } = require("./server.js");
const { Resources } = require("./resources.js");

const server = new Server(config.server);
