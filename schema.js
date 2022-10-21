'use strict';

const path = require('node:path');
const fs = require('node:fs').promises;
const metavm = require('metavm');
const { Cache } = require('./cache.js');


class Schema extends Cache {
  constructor(place) {
    super(place)
  }

  async change(filePath, file) {
    const entity = {};
    const key = path.basename(file, '.js');
    const src = await fs.readFile(filePath, 'utf-8');
    const ms = new metavm.MetaScript('Schema', `${src}`);
    entity[key] = ms.exports;
    return entity;
  }
  
  async load(targetPath = this.path) {
    return await super.load(targetPath);
  }

}
const schema = new Schema('/schema');

module.exports = schema;