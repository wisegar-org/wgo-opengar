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
const { execSync } = require('child_process');

console.log('\x1b[33m', 'BUILDING & DEPLOYING FINANCE API');
const destination = './build';
const sourceFiles = ['package.json', 'package-lock.json', '.npmrc', '.env', 'node_modules'];

const APP_DEAMON_NAME = 'wgo-finance-api-stg';
const APP_WEB_ROOT = `C:\\Web\\Sites\\${APP_DEAMON_NAME}`;
const APP_START_FILE = `${APP_WEB_ROOT}\\index.js`;

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}
fs.emptyDirSync(destination);

console.log('\x1b[33m', 'Creating build.cfg file...');
const BUILD_FILE_CONF = `./build.cfg`;
fs.writeFileSync(BUILD_FILE_CONF, `MODULES=${MODULES} \n`, function (err) {
  if (err) return console.log(err);
});

const client_folder2 = path.join(client_folder, REPO_NAME);

/// Clone wgo-opengar
execSync(`git clone ${GIT_PATH_UI}`, { cwd: client_folder });
console.log('\x1b[33m', 'Running npm install...');
execSync('npm install', { cwd: client_folder2, stdio: 'inherit' });
/// Run build.js del wgo-opengar
/// Pasarle como argumentos los siguientes
/// Args:
/// - APP_NAME: APP_DEAMON_NAME + '-ui'
/// - API_BASE: ???
/// - WEB_ROOT: WEB_ROOT + '/client'
/// - MODULES: MODULES
console.log('\x1b[33m', 'Running node build.js...');
execSync(`node build.js ${APP_DEAMON_NAME}-UI ${API_BASE} ${WEB_ROOT}/client ${MODULES}`, {
  cwd: client_folder,
  stdio: 'inherit',
});

/// Build API
console.log('\x1b[33m', 'Running npm install...');
execSync('npm install', { stdio: 'inherit' });

console.log('\x1b[33m', 'Running tsc...');
execSync('npx tsc', { stdio: 'inherit' });

sourceFiles.forEach((file) => {
  fs.copySync(file, `${destination}/${file}`);
});

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
        fs.removeSync(APP_WEB_ROOT);
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
      fs.removeSync(APP_WEB_ROOT);
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
