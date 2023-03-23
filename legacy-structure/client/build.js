/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[33m', 'BUILDING & DEPLOYING WEB APP UI');

//#region Arguments
const BUILD_ARGS = process.argv.slice(2);
console.log('\x1b[33m', `BUILD_ARGS: ${BUILD_ARGS}`);

if (!BUILD_ARGS || BUILD_ARGS.length < 4)
  throw 'Params pipeline not provided. Please provide: app_name api_base_url web_root_folder_full_path module_to_build';

const APP_NAME = BUILD_ARGS[0];
console.log('\x1b[33m', `APP_NAME: ${APP_NAME}`);

const API_BASE = BUILD_ARGS[1];
console.log('\x1b[33m', `API_BASE: ${API_BASE}`);

const WEB_ROOT = BUILD_ARGS[2];
console.log('\x1b[33m', `WEB_ROOT: ${WEB_ROOT}`);

const MODULES = BUILD_ARGS[3];
console.log('\x1b[33m', `MODULES: ${MODULES}`);

const APP_WEB_ROOT = path.join(WEB_ROOT, APP_NAME);
console.log('\x1b[33m', `APP_WEB_ROOT: ${APP_WEB_ROOT}`);

//#endregion

//#region  Configuration files
const packageJson = fs.readJsonSync('package.json', { throws: true });
if (!packageJson || !packageJson.version) {
  throw 'Impossible to read package.json file!';
}

console.log('\x1b[33m', 'Creating build settings...');
fs.writeJsonSync('settings.build.json', {
  API_BASE: API_BASE,
  VERSION: packageJson.version,
  MODULES: MODULES
});

//#endregion

//#region  Setting modules theme
execSync('npx node buildTheme.js', { stdio: 'inherit' });
//#endregion

//#region  Building project
fs.removeSync('./dist/spa');
console.log('\x1b[33m', 'Building the spa...');
execSync('npx quasar build', { stdio: 'inherit' });
/////////////////////////////////////COPY///TO///DEPLOY///////////////////////////////////////////
// USE IF DEPLOY ONLY CLIENT
console.log('\x1b[33m', 'Deploying the spa...');
fs.emptyDirSync(APP_WEB_ROOT);
fs.copySync('./dist/spa', APP_WEB_ROOT);
//#endregion
console.log('\x1b[33m', 'BUILDING & DEPLOYING CLIENT APP COMPLETED');
