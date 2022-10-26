'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { prepareFile } = require('./common.js');

const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  json: 'application/json; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = (root, port, console) => {
  http.createServer(async (req, res) => {
    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    try {
      const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.html;
      res.writeHead(statusCode, { ...HEADERS, 'Content-Type': mimeType });
      file.stream.pipe(res);
      console.log(`${req.method} ${req.url} ${statusCode}`);
    } catch (err) {
      file.stream(res)
    }
  }).listen(port);
  
  console.log(`Static on port ${port}`);
};
404

