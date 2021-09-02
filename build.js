/// Build file
/// Args:
/// - APP_DEAMON_NAME
/// - NODE_ENV
/// - PORT_ENV
/// - API_TOKEN
/// - WEB_ROOT
/// - MODULES
/// - GIT_PATH_UI
/// - API_BASE


const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[33m', 'BUILDING & DEPLOYING FINANCE API');

const BUILD_ARGS = process.argv.slice(2);
console.log('\x1b[33m', `BUILD_ARGS: ${BUILD_ARGS}`);

const APP_DEAMON_NAME = BUILD_ARGS && BUILD_ARGS.length > 0 ? BUILD_ARGS[0] : 'wgo-finance-api';
console.log('\x1b[33m', `APP_DEAMON_NAME: ${APP_DEAMON_NAME}`);

const NODE_ENV = BUILD_ARGS && BUILD_ARGS.length > 1 ? BUILD_ARGS[1] : 'development';
console.log('\x1b[33m', `NODE_ENV: ${NODE_ENV}`);

const PORT_ENV = BUILD_ARGS && BUILD_ARGS.length > 2 ? BUILD_ARGS[2] : '5010';
console.log('\x1b[33m', `PORT_ENV: ${PORT_ENV}`);

const API_TOKEN = BUILD_ARGS && BUILD_ARGS.length > 3 ? BUILD_ARGS[3] : '';
console.log('\x1b[33m', `API_TOKEN: ${API_TOKEN}`);

const WEB_ROOT = BUILD_ARGS && BUILD_ARGS.length > 4 ? BUILD_ARGS[4] : 'C:\\Web\\Sites';
console.log('\x1b[33m', `WEB_ROOT: ${WEB_ROOT}`);

const APP_WEB_ROOT = path.join(WEB_ROOT, APP_DEAMON_NAME);
console.log('\x1b[33m', `APP_WEB_ROOT: ${APP_WEB_ROOT}`);

const MODULES = BUILD_ARGS && BUILD_ARGS.length > 5 ? BUILD_ARGS[5] : '';
console.log('\x1b[33m', `MODULES: ${MODULES}`);

const GIT_PATH_UI = BUILD_ARGS && BUILD_ARGS.length > 6 ? BUILD_ARGS[6] : '';
console.log('\x1b[33m', `GIT_PATH_UI: ${GIT_PATH_UI}`);

const API_BASE = BUILD_ARGS && BUILD_ARGS.length > 7 ? BUILD_ARGS[7] : '';
console.log('\x1b[33m', `API_BASE: ${API_BASE}`);

const APP_START_FILE = path.join(APP_WEB_ROOT, 'index.js');

const packageJson = fs.readJsonSync('package.json', { throws: false });

const PM2_ENV = {};
PM2_ENV['NODE_ENV'] = NODE_ENV;
PM2_ENV['PORT'] = PORT_ENV;
PM2_ENV['API_TOKEN'] = API_TOKEN;
PM2_ENV['APP_WEB_ROOT'] = APP_WEB_ROOT;
PM2_ENV['API_VERSION'] = packageJson ? packageJson.version : 'unknown version';
console.log('\x1b[33m', `PM2_ENV: ${PM2_ENV['NODE_ENV']}`);

const destination = './build';
const sourceFiles = [
  'package.json',
  'package-lock.json',
  '.npmrc',
  'node_modules',
  'settings.json',
  'settings.staging.json',
  'settings.development.json',
];

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}
fs.emptyDirSync(destination);

// Crear carpeta donde clonar el cliente
const client_folder = './client';
if (!fs.existsSync(client_folder)) {
  fs.mkdirSync(client_folder);
}
fs.emptyDirSync(client_folder);

/// Clone wgo-opengar
execSync(`git clone ${GIT_PATH_UI}`, {cwd: client_folder});
console.log('\x1b[33m', 'Running npm install...');
execSync('npm install', { cwd: client_folder, stdio: 'inherit' });
/// Run build.js del wgo-opengar
/// Pasarle como argumentos los siguientes 
/// Args:
/// - APP_NAME: APP_DEAMON_NAME + '-ui'
/// - API_BASE: ???
/// - WEB_ROOT: WEB_ROOT + '/client'
/// - MODULES: MODULES
console.log('\x1b[33m', 'Running node build.js...');
execSync(`node build.js ${APP_DEAMON_NAME}-UI ${API_BASE} ${WEB_ROOT}/client ${MODULES}`, { cwd: client_folder, stdio: 'inherit' });

/// Build API
console.log('\x1b[33m', 'Running npm install...');
execSync('npm install', { stdio: 'inherit' });

console.log('\x1b[33m', 'Creating env file...');
const ENV_FILENAME = `${destination}/.env`;
fs.writeFileSync(ENV_FILENAME, `NODE_ENV=${NODE_ENV} \n`, function (err) {
  if (err) return console.log(err);
});
fs.appendFileSync(ENV_FILENAME, `PORT=${PORT_ENV} \n`);
fs.appendFileSync(ENV_FILENAME, `API_TOKEN=${API_TOKEN} \n`);
fs.appendFileSync(ENV_FILENAME, `API_VERSION=${PM2_ENV['API_VERSION']} \n`);
fs.appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${PM2_ENV['APP_WEB_ROOT']} \n`);
fs.appendFileSync(ENV_FILENAME, `MODULES=${MODULES} \n`);

console.log('\x1b[33m', 'Running tsc...');
execSync('npx tsc', { stdio: 'inherit' });

sourceFiles.forEach((file) => {
  fs.copySync(file, `${destination}/${file}`);
});

if (!fs.existsSync(APP_WEB_ROOT)) {
  fs.mkdirSync(APP_WEB_ROOT);
}
fs.emptyDirSync(APP_WEB_ROOT);

const pm2 = require('pm2');
pm2.connect(function (err) {
  if (err) {
    console.log('\x1b[31m', 'Impossible to stablish  pm2 connection...!', err);
    process.exit(2);
  }
  pm2.list((err, list) => {
    if (err) {
      console.log('\x1b[31m', 'Impossible to list pm2 deamon list...');
      pm2.disconnect();
      process.exit(2);
    }
    const appDemon = list ? list.find((app) => app.name === APP_DEAMON_NAME) : undefined;
    if (appDemon) {
      console.log('\x1b[33m', 'Application found!');
      console.log('\x1b[33m', 'Stopping application deamon!');
      pm2.stop(APP_DEAMON_NAME, (err, proc) => {
        console.log('\x1b[33m', 'Deploying application files...');
        fs.copySync('build', APP_WEB_ROOT);
        console.log('\x1b[33m', 'Restarting application deamon...');
        pm2.start(APP_DEAMON_NAME, (err, proc) => {
          pm2.disconnect();
          console.log('\x1b[33m', 'Application restarted!');
          process.exit(0);
        });
      });
    } else {
      console.log('\x1b[33m', 'Application not found!');
      console.log('\x1b[33m', 'Deploying application files...');
      fs.copySync('build', APP_WEB_ROOT);
      console.log('\x1b[33m', 'Adding application Deamon!');
      pm2.start(
        {
          name: APP_DEAMON_NAME,
          script: APP_START_FILE,
          max_memory_restart: '200M',
        },
        (err, apps) => {
          execSync('pm2 save', { stdio: 'inherit' });
          pm2.disconnect();
          if (err) {
            console.log('\x1b[31m', 'Impossible to start the app deamon');
            process.exit(2);
          }
          console.log('\x1b[33m', 'Application started!');
          process.exit(0);
        }
      );
    }
  });
});
