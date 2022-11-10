const { parse } = require("node:url");
const metautil = require("metautil");
const path = require("node:path");
const { prepareFile, receiveArgs } = require("./common.js");

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

const index = (url) => path.join(url, "index.html");

const myhandler = async (channel, routing) => {
  const { req, res } = channel;
  const { url, method } = req;
  const [urlPath, params] = metautil.split(url, "?");
  const [place, mt] = url.substring(1).split("/");
  let filePath = urlPath.endsWith("/") ? index(urlPath) : urlPath;

  
  
  console.log({ filePathBefore: filePath, method });


  if (!filePath.startsWith("/static") && filePath !== "/index.html") {
    if (filePath === '/articles') 
      res.writeHead(202, { Location: `/articles`, ...HEADERS,});
      
    if (filePath.includes("/static")) {
      const index = filePath.indexOf("/static");
      const res = filePath.substring(index);
      filePath = res;
    } else filePath = "/";
  }


  if (method === "POST") {
    if (url === "/articles") {
      const [path, id] = url.substring(1).split("/");
      console.log({ path, id });
      try {
        const data = {};
        const args = await receiveArgs(req);
        args.split("&").map((str) => {
          let n = str.split("=");
          data[n[0]] = n[1];
        });
        const handler = await routing.posts.article;
        const article = await handler(data);

        res.writeHead(302, {
          Location: `/articles/${article[0].articleId}`,
          ...HEADERS,
        });
        return res.end();
      } catch (error) {
        console.log({ error, errorNum: 'ONE' });
      }
    }
  }

  // console.log({ filePathAfter: filePath, method });

  const file = await prepareFile(filePath);
  const statusCode = file.found ? 200 : 404;
  try {
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.html;
    res.writeHead(statusCode, { ...HEADERS, "Content-Type": mimeType });
    // console.log(`${req.method} ${req.url} ${statusCode}`);
    file.stream.pipe(res);
  } catch (err) {
    console.log({ err, errorNum: 'TWO' });
  }
};

module.exports = { myhandler };
