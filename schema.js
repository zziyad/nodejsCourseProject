'use strict';

const path = require('node:path');
const fs = require('node:fs');

const entities = new Map();

const loadEntity = (schemaPath, name) => {
  const filePath = schemaPath + name;
  const key = path.basename(filePath, '.js');
  try {
    const modulePath = require.resolve(filePath);
    delete require.cache[modulePath];
  } catch (e) {
    return;
  }
  try {
    const entity = require(filePath);
    entities.set(key, entity);
    // console.log({ entities });
  } catch (e) {
    entities.delete(key);
  }
};

const schema = {};

schema.load = (schemaPath) => {
  fs.readdir(schemaPath, (err, files) => {
    if (err) return;
    files.forEach((name) => {
      loadEntity(schemaPath, name);
    });
  });
  return schema;
};



schema.get = (name) => {
  console.log('I am here');
  console.log({ entities, name, map: [...entities] });
  entities.get(name);
}

schema.load('./schema/');
module.exports = schema;
