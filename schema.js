"use strict";

const path = require("node:path");
const fs = require("node:fs").promises;
const metavm = require("metavm");
const { Cache } = require("./cache.js");

class Schema extends Cache {
  constructor(place) {
    super(place);
    this.entity = {};
  }

  async change(filePath, file) {
    const key = path.basename(file, ".js");
    const src = await fs.readFile(filePath, "utf-8");
    const ms = new metavm.MetaScript("Schema", `${src}`);
    this.entity[key] = ms.exports;
  }

  async load(targetPath = this.path) {
    await super.load(targetPath);
    return this.entity;
  }
}
const schema = new Schema("/schema");

module.exports = schema;
