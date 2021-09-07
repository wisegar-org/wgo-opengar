const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[33m', 'BUILDING & DEPLOYING FINANCE API');

const BUILD_ARGS = process.argv.slice(2);
console.log('\x1b[33m', `BUILD_ARGS: ${BUILD_ARGS}`);

if (!BUILD_ARGS || BUILD_ARGS.length < 3)
  throw 'Params pipeline not provided. Help: environment server_port module_to_build';

const NODE_ENV = BUILD_ARGS[0] ? BUILD_ARGS[0] : 'development';
console.log('\x1b[33m', `NODE_ENV: ${NODE_ENV}`);

const PORT_ENV = BUILD_ARGS[1] ? BUILD_ARGS[1] : '5010';
console.log('\x1b[33m', `PORT_ENV: ${PORT_ENV}`);

const MODULE_ENV = BUILD_ARGS[2] ? BUILD_ARGS[2] : 'wgo';
console.log('\x1b[33m', `MODULE_ENV: ${MODULE_ENV}`);

const packageJson = fs.readJsonSync('package.json', { throws: false });

const mainmodule = require(`./src/modules/${MODULE_ENV}/deploy`);
mainmodule.build(NODE_ENV, PORT_ENV);
// mainmodule.buildClient(NODE_ENV);

//execSync(`npm run ./src/modules/agv/deploy.js production 5677`, { stdio: 'inherit' });
