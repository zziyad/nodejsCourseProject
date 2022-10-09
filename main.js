'use strict';

const config = require('./config.js')
const vm = require('node:vm');
const fs = require('node:fs').promises;
const db = require('./db.js')(config.db);
const path = require('node:path');
const hash = require('./hash.js');
const logger = require('./logger.js');
const staticServer = require('./static.js');
const apiPath = path.join(process.cwd(), './api');


class Application {
  constructor() {
    this.routing = {}
  }
  
  async init() {
    this.createSandbox();
    await this.loadModule();
    staticServer(config.static.port);
    config.transport.ws(this.routing, config.api.port);
  }

  createSandbox() {
    const sandbox = {
      console: Object.freeze(logger),
      db: Object.freeze(db),
      common: { hash },
    };

    this.sandbox = vm.createContext(Object.freeze({ ...sandbox }));
  }

  async load(filePath) {
    const src = await fs.readFile(filePath, 'utf-8');
    const code = `'use strict';\n${src}`;
    const script = new vm.Script(code);
    const context = this.sandbox;
    const exported = script.runInContext(context, { ...config.sandbox });
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