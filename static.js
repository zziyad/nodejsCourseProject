"use strict";

const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const { prepareFile } = require("./common.js");

const MIME_TYPES = {
  html: "text/html; charset=UTF-8",
  json: "application/json; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const HEADERS = {
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Strict-Transport-Security": "max-age=31536000; includeSubdomains; preload",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

module.exports = (routing, port, console) => {
  http
    .createServer(async (req, res) => {
      const { url } = req;

      // res.writeHead(200, HEADERS);
      // // if (req.method !== 'POST') return res.end('"Not found"');
      // const { url, socket } = req;
      // console.log({ url });
      // const [method] = url.substring(1).split('/');
      // console.log({ method });
      // if (place !== 'api') return res.end('"Not found1"');
      // const entity = routing[name];
      // console.log(entity);
      // if (!entity) return res.end('"Not found2"');
      // const handler = entity[method];
      // if (!handler) return res.end('"Not found3"');
      // const { args } = await receiveArgs(req);
      // console.log(`${socket.remoteAddress} ${method} ${url}`);
      // const result = await handler(args);
      // // const article = await routing.article()
      // console.log(result);

      // console.log(url, article);
      const file = await prepareFile(url);
      const statusCode = file.found ? 200 : 404;
      try {
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.html;
        res.writeHead(statusCode, { ...HEADERS, "Content-Type": mimeType });
        console.log(`${req.method} ${req.url} ${statusCode}`);
        file.stream.pipe(res);
      } catch (err) {
        console.log({ err });
      }
    })
    .listen(port);

  console.log(`Static on port ${port}`);
};
