const http = require("node:http");
const https = require("node:https");
const transport = require("./transport.js");
const { serveStatic } = require("./static.js");
const { myhandler } = require("./handler.js");
const { apiHandler } = require("./apiHandler");

class Server {
  constructor(routing, options) {
    const { cors } = options;
    this.options = options;
    this.routing = routing;
    if (cors) transport.http.addHeaders(cors);
    // this.applicatione = applicatione;
    this.server = null;
    this.bind();
  }

  bind() {
    const { options } = this;
    const { port, protocol, host } = options;
    const proto = protocol === "http" ? http : https;
    const listener = this.listener.bind(this);
    this.server = proto.createServer(listener);
    this.server.on("listening", () => {
      console.log(`Listen port ${port}`);
    });
    this.server.listen(port, host);
  }

  async listener(req, res) {
    const { url } = req;
    // console.log({ urlListener: url });
    const channel = transport.http.createChannel(req, res);
    const [place] = url.substring(1).split("/");
    // console.log({apiurl: url.startsWith('/api') });
    if (place === "api") apiHandler(channel, this.routing);
    else myhandler(channel, this.routing);
  }
}

module.exports = { Server };
