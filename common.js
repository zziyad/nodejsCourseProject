const crypto = require('node:crypto');
const path = require('path');
const fs = require('fs');
const STATIC_PATH = path.join(process.cwd(), './static');

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith('/')) paths.push('index.html');
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const steamPath = found ? filePath : STATIC_PATH + '/404.html';
  const ext = path.extname(steamPath).substring(1).toLocaleLowerCase();
  const stream = fs.createReadStream(steamPath);
  return { found, ext, stream };
};



const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(16).toString('base64');
  crypto.scrypt(password, salt, 64, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString('base64'));
  });
});

module.exports = { prepareFile, hash,  };