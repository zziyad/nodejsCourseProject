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
class Application {
  constructor() {
    this.routing = {};
    // this.schema;
  }
  
  async init() {
    await this.createSandbox();
    await this.loadModule();
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

  async load(filePath) {
    const src = await fs.readFile(filePath, 'utf-8');
    const code = `'use strict';\n${src}`;
    const script = new vm.Script(code);
    const context = this.sandbox;
    const exported = script.runInContext(context, config.sandbox);
    return exported;
  }

  async loadModule() {
    const files = await fs.readdir(apiPath);
    for (const fileName of files) {
      if (!fileName.endsWith('.js')) continue;
      const filePath = path.join(apiPath, fileName);
      const serviceName = path.basename(fileName, '.js');
      this.routing[serviceName] = await this.load(filePath);
    }
  }
}

const app = new Application();
app.init()