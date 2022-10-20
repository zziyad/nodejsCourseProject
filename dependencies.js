const node = {};
const internals = [
  'util',
  'child_process',
  'worker_threads',
  'os',
  'v8',
  'vm',
  'path',
  'url',
  'assert',
  'querystring',
  'string_decoder',
  'perf_hooks',
  'async_hooks',
  'timers',
  'events',
  'stream',
  'fs',
  'crypto',
  'zlib',
  'readline',
  'dns',
  'net',
  'tls',
  'http',
  'https',
  'http2',
  'dgram',
];

for (const name of internals) node[name] = require(`node:${name}`);

node.process = process;
node.childProcess = node['child_process'];
node.StringDecoder = node['string_decoder'];
node.perfHooks = node['perf_hooks'];
node.asyncHooks = node['async_hooks'];
node.worker = node['worker_threads'];
node.fsp = node.fs.promises;

Object.freeze(node);

// const npm = {
//   ws: import('ws'),
//   metautil: import('metautil'),
// };

// const pkg = await import(process.cwd() + '/package.json',
//   { assert: { type: 'json' } });

// if (pkg.dependencies) {
//   for (const dependency of Object.keys(pkg.dependencies)) {
//      npm[dependency] = import(dependency);
//   }
// };

// Object.freeze(npm);


module.exports = { node }