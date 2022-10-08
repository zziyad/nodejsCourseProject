
const path = require('node:path');
const vm = require('node:vm');
const fs = require('node:fs').promises;
const db = require('./db.js');
const hash = require('./hash.js');
const logger = require('./logger.js');
const RUN_OPTIONS = { timeout: 5000, displayErrors: false };
const apiPath = path.join(process.cwd(), './api');

class Loader {
  constructor() {
    this.routing = {}
  }
  
  async init() {
    this.createSandbox();
    await this.loadModule()
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
    const exported = script.runInContext(context, RUN_OPTIONS);
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

const load = new Loader();

module.exports = { load }