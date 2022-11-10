const { parse } = require("node:url");
const metautil = require("metautil");
const path = require("node:path");
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

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

const apiHandler = async (channel, routing) => {
  const { req, res } = channel;
  res.writeHead(200, HEADERS);
  if (req.method !== "POST") return res.end('"Not found"');
  const { url, socket } = req;
  // console.log({ url });
  const [place, name, method] = url.substring(1).split("/");
  if (place !== "api") return res.end('"Not found1"');
  const entity = routing[name];
  if (!entity) return res.end('"Not found2"');
  // console.log({ method, url, entity });
  const handler = entity[method];
  if (!handler) return res.end('"Not found3"');
  const { args } = await receiveArgs(req);
  // console.log(`${socket.remoteAddress} ${method} ${url}`);
  const result = await handler(args);
  res.end(JSON.stringify(result));
};

module.exports = { apiHandler };
