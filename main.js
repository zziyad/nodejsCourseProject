'use strict';

const staticServer = require('./static.js');
// const { init, routing } = require('./load.js');
const { load } = require('./load.js');
const { transport, ports } = require('./config.js')


load.init()
staticServer(ports.staticPort);
transport.ws(load.routing, ports.apiPort);
