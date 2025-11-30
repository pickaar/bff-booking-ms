const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

/**
 * Database models registry
 * Automatically loads all model files from this directory
 */
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
    && file !== basename
    && file.slice(-3) === '.js'
    && !file.includes('.test.js')
  ))
  .forEach((file) => {
    const fileName = file.slice(0, -3);
    const model = require(path.join(__dirname, file));
    db[fileName] = model;
  });

module.exports = db;

