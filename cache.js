'use strict';

const path = require('path');
const fsp = require('fs').promises;

class Cache {
  constructor(place) {
    this.place = place;
    this.path = process.cwd() + place;
  }

  async load(targetPath = this.path) {
    try {
      const files = await fsp.readdir(targetPath, { withFileTypes: true });
      for (const file of files) {
        if (file.name.startsWith('.') && !file.name.endsWith('.js')) continue;
        const filePath = path.join(targetPath, file.name);
        if (file.isDirectory()) await this.load(filePath);
        await this.change(filePath, file.name);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { Cache };
