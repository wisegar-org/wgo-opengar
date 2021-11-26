const { execSync } = require('child_process');

console.log('\x1b[34m', 'BUILDING & DEPLOYING FINANCE API');

const BUILD_ARGS = process.argv.slice(2);
console.log('\x1b[34m', `BUILD_ARGS: ${BUILD_ARGS}`);

if (!BUILD_ARGS || BUILD_ARGS.length < 4)
  throw 'Params pipeline not provided. Please provide: environment server_port module_to_build';

const NODE_ENV = BUILD_ARGS[0] ? BUILD_ARGS[0] : 'development';
console.log('\x1b[34m', `NODE_ENV: ${NODE_ENV}`);

const PORT_ENV = BUILD_ARGS[1] ? BUILD_ARGS[1] : '5010';
console.log('\x1b[34m', `PORT_ENV: ${PORT_ENV}`);

const MODULE_ENV = BUILD_ARGS[2] ? BUILD_ARGS[2] : 'wgo';
console.log('\x1b[34m', `MODULE_ENV: ${MODULE_ENV}`);

const WEB_ROOT_ENV = BUILD_ARGS[3] ? BUILD_ARGS[3] : '/users/yarielre/web';
console.log('\x1b[34m', `WEB_ROOT_ENV: ${WEB_ROOT_ENV}`);

const mainmodule = require(`./deploy`);
mainmodule.buildApi(MODULE_ENV, NODE_ENV, PORT_ENV, WEB_ROOT_ENV);
mainmodule.buildClient(MODULE_ENV, NODE_ENV);