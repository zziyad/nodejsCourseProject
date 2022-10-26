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
      const files = await fsp.readdir(targetPath);
      for (const file of files) {
        if (file.startsWith('.') && !file.endsWith('.js')) continue;
        const filePath = path.join(targetPath, file);
        // if (file.isDirectory()) await this.load(filePath);
        await this.change(filePath, file);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { Cache };
