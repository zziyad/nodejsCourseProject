'use strict';

const path = require('node:path');
const fs = require('node:fs').promises;
const metavm = require('metavm');


class Schema {
  constructor(schemaPath) {
    this.schemaPath = schemaPath;
  }

  async loadEntity(schemaPath, name) {
    const entity = {}
    const filePath = `${schemaPath}${name}`;
    const key = path.basename(filePath, '.js');
    const src = await fs.readFile(filePath, 'utf-8');
    const ms = new metavm.MetaScript('Example', `${src}`);
    entity[key] = ms.exports;
    return entity;
  }

  async load() {
    const entity = {}
    try {
      const files = await fs.readdir(this.schemaPath);
      for await (const file of files) {
        const item = await this.loadEntity(this.schemaPath, file);
        const key = path.basename(file, '.js');
        entity[key] = item
      }
      return entity;
    } catch (err) {
      console.error(err);
    }
  }
}
const schema = new Schema('./schema/');

module.exports = schema;