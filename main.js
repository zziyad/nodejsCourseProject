'use strict';

const fs = require('node:fs').promises;
const vm = require('node:vm');
const path = require('node:path');
const staticServer = require('./static.js');
const logger = require('./logger.js');
const hash = require('./hash.js');
const config = require('./config.js');
const load = require('./load.js')(config.sandbox);
const db = require('./db.js')(config.db);
const transport = require(`./transport/${config.api.transport}.js`);
const apiPath = path.join(process.cwd(), './api');
const schema = require('./schema.js');
const { node } = require('./dependencies.js');
const { Cache } = require('./cache.js');

class Application extends Cache {
  constructor(place) {
    super(place)
    this.routing = {};
  }
  
  async init() {
    await this.createSandbox();
    await this.load();
    staticServer('./static', config.static.port, logger);
    transport(this.routing, config.api.port, logger);
  }

  async createSandbox() {
    const sch = await schema.load();
    const sandbox = {
      console: Object.freeze(logger),
      db: Object.freeze(db),
      common: { hash },
      schema: Object.freeze(sch),
      node: Object.freeze(node),
    };

    this.sandbox = vm.createContext(Object.freeze({ ...sandbox }));
  }

  async change(filePath, file) {
    const serviceName = path.basename(file, '.js');
    const src = await fs.readFile(filePath, 'utf-8');
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

const app = new Application('/api');
app.init()
