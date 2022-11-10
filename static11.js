"use strict";

const path = require("path");
const metautil = require("metautil");
const { Resources } = require("./resources.js");
const staticFiles = new Resources("/static");
staticFiles.load();

const index = (url) => path.join(url, "index.html");

const serveStatic = (channel) => {
  const { req, res, application } = channel;
  // console.log({ application });
  if (res.writableEnded) return;
  const { url } = req;
  const [urlPath, params] = metautil.split(url, "?");
  const filePath = urlPath.endsWith("/") ? index(urlPath) : urlPath;
  const fileExt = path.extname(filePath).substring(1);
  const data = staticFiles.get(filePath);

  if (data) {
    channel.write(data, 200, fileExt);
    return;
  }
  if (fileExt !== "html") {
    console.log(fileExt);
    if (application.getStaticFile(index(filePath))) {
      const query = params ? "?" + params : "";
      channel.redirect(filePath + "/" + query);
      return;
    }
  }
  console.log("error");
};

module.exports = { serveStatic };
