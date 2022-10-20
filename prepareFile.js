const path = require('path');
const fs = require('fs');
const toBool = [() => true, () => false];

const STATIC_PATH = path.join(process.cwd(), './static');

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

module.exports = { prepareFile };