"use strict";

const fs = require("node:fs").promises;
const vm = require("node:vm");
const schema = require("./schema.js");
const path = require("node:path");
const logger = require("./logger.js");
const config = require("./config.js");
// const db = require("./db.js")(config.db);
const metasqlDB = require("./metasqlDB.js")(config.metasqlDB);
const { node, npm } = require("./dependencies.js");
const { Cache } = require("./cache.js");
const { Server } = require("./server.js");
// const staticServer = require('./static.js');
// const { hash } = require('./common.js');
// const transport = require(`./transport/${config.api.transport}.js`);

// console.log({ metasqlDB });

class Application extends Cache {
  constructor(place) {
    super(place);
    this.routing = {};
    this.server = null;
  }

  async init() {
    await this.createSandbox();
    await this.load();
    await schema.load();
    this.server = new Server(this.routing, config.server);
    // staticServer(this.routing, config.static.port, logger);
    // transport(this.routing, config.api.port, logger);
  }

  async createSandbox() {
    const sandbox = {
      console: Object.freeze(logger),
      // db: Object.freeze(db),
      sql: Object.freeze(metasqlDB),
      schema: Object.freeze(schema),
      node: Object.freeze(node),
      npm: Object.freeze(npm),
    };

    this.sandbox = vm.createContext(Object.freeze({ ...sandbox }));
  }

  async change(filePath, file) {
    const serviceName = path.basename(file, ".js");
    const src = await fs.readFile(filePath, "utf-8");
    const code = `'use strict';\n${src}`;
    const script = new vm.Script(code);
    const context = this.sandbox;
    const exported = script.runInContext(context, config.sandbox);
    this.routing[serviceName] = exported;
  }

  async load(targetPath = this.path) {
    return await super.load(targetPath);
  }
}

const app = new Application("/api");
app.init();
