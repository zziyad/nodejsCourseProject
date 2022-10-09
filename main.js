'use strict';

const staticServer = require('./static.js');
// const { init, routing } = require('./load.js');
const { load } = require('./load.js');
const config = require('./config.js')


load.init()
staticServer(config.static.port);
config.transport.ws(load.routing, config.api.port);
