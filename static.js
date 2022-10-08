'use strict';

const http = require('node:http');
const { mimeTypes } = require('./config.js')
const { prepareFile } = require('./prepareFile.js');


module.exports = (port) => {
  http.createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = mimeTypes[file.ext] || mimeTypes.default;
    res.writeHead(statusCode, { 'Content-type': mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
    }).listen(port);


  console.log(`Static on port ${port}`);
};
