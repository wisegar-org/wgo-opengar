const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const clearBuildFolders = (localRepoPath, clientTempbuild) => {
  if (localRepoPath && fs.existsSync(localRepoPath)) {
    execSync(`npx rimraf ${localRepoPath}`, { stdio: 'inherit' });
  }
  if (clientTempbuild && fs.existsSync(clientTempbuild)) {
    execSync(`npx rimraf ${clientTempbuild}`, { stdio: 'inherit' });
  }
};

const buildApi = (module, environment, port, apiWebRoot) => {
  const settingsFileName = environment === 'production' ? 'settings.json' : `settings.${environment}.json`;
  const deploySettings = fs.readJsonSync(`./src/modules/${module}/${settingsFileName}`, { throws: false });
  deploySettings.WEB_ROOT = apiWebRoot;
  fs.writeJsonSync(`./src/modules/${module}/${settingsFileName}`, deploySettings);

  const MODULE_NAME = deploySettings.NAME;
  console.log('\x1b[33m', `MODULE_NAME: ${MODULE_NAME}`);

  const APP_NAME = deploySettings.APP_NAME;
  console.log('\x1b[33m', `APP_NAME: ${APP_NAME}`);

  const WEB_ROOT = deploySettings.WEB_ROOT;
  console.log('\x1b[33m', `WEB_ROOT: ${WEB_ROOT}`);

  const APP_WEB_ROOT = path.join(WEB_ROOT, APP_NAME);
  console.log('\x1b[33m', `APP_WEB_ROOT: ${APP_WEB_ROOT}`);

  const API_BASEURL = `${deploySettings.API_BASEURL}:${port}`;
  console.log('\x1b[33m', `API_BASE: ${API_BASEURL}`);

  const API_TOKEN = deploySettings.GITHUB_API_TOKEN || 'API_TOKEN';
  console.log('\x1b[33m', `API_TOKEN: ${deploySettings.GITHUB_API_TOKEN ? API_TOKEN : 'NULL'}`);

  const destination = './build';
  const sourceFiles = ['package.json', 'package-lock.json', '.npmrc'];
  const moduleFiles = ['settings.json', 'settings.staging.json', 'settings.development.json'];

  console.log('\x1b[33m', 'Cleaning build destination folder'.toUpperCase());
  fs.emptyDirSync(destination);

  console.log('\x1b[33m', 'Installing dependencies'.toUpperCase());
  execSync('npm install', { stdio: 'inherit' });

  console.log('\x1b[33m', 'Transpiling the application code'.toUpperCase());
  execSync('npx tsc', { stdio: 'inherit' });

  console.log('\x1b[33m', 'Building environment file'.toUpperCase());
  const ENV_FILENAME = `${destination}/.env`;
  fs.writeFileSync(ENV_FILENAME, `NODE_ENV=${environment} \n`, function (err) {
    if (err) return console.log(err);
  });
  fs.appendFileSync(ENV_FILENAME, `PORT=${port} \n`);
  fs.appendFileSync(ENV_FILENAME, `MODULES=${[MODULE_NAME]} \n`);
  fs.appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${[APP_WEB_ROOT]} \n`);
  fs.appendFileSync(ENV_FILENAME, `API_TOKEN=${[API_TOKEN]} \n`);

  console.log('\x1b[33m', 'Updating build settings & dependencies'.toUpperCase());
  sourceFiles.forEach((file) => {
    fs.copySync(file, `${destination}/${file}`);
  });

  moduleFiles.forEach((file) => {
    fs.copySync(`./src/modules/${MODULE_NAME}/${file}`, `${destination}/${file}`);
  });

  execSync('npm ci --quiet --only=production', { cwd: `${destination}`, stdio: 'inherit' });

  console.log('\x1b[33m', 'Deployment complete'.toUpperCase());
};

const clientBuild = (module, environment) => {
  const settingsFileName = environment === 'production' ? 'settings.json' : `settings.${environment}.json`;
  const deploySettings = fs.readJsonSync(`./src/modules/${module}/${settingsFileName}`, { throws: false });

  const MODULE_NAME = deploySettings.NAME;
  console.log('\x1b[33m', `MODULE_NAME: ${MODULE_NAME}`);

  const APP_CLIENT_GIT_PATH = deploySettings.APP_CLIENT_GIT_PATH;
  console.log('\x1b[33m', `APP_CLIENT_GIT_PATH: ${APP_CLIENT_GIT_PATH}`);

  console.log('\x1b[33m', 'Clone client version'.toUpperCase());
  const os = require('os');
  const tempDir = os.tmpdir();
  const giturl = new URL(APP_CLIENT_GIT_PATH);
  const reponame = path.basename(giturl.pathname);
  const repofolder = path.basename(reponame, path.extname(reponame));
  const localRepoPath = path.join(tempDir, repofolder);
  // --branch ${MODULE_NAME}
  // clearBuildFolders(localRepoPath, undefined);
  execSync(`git clone ${APP_CLIENT_GIT_PATH}`, { cwd: tempDir, stdio: 'inherit' });
  const sourceFiles = ['.npmrc'];
  sourceFiles.forEach((file) => {
    fs.copySync(file, `${localRepoPath}/${file}`);
  });

  execSync('npm install', { cwd: `${localRepoPath}`, stdio: 'inherit' });

  const APP_CLIENT_BASEURL = deploySettings.APP_CLIENT_BASEURL;
  console.log('\x1b[33m', `APP_CLIENT_BASEURL: ${APP_CLIENT_BASEURL}`);

  const clientTempbuild = path.join(tempDir, `${repofolder}-build`);
  console.log('\x1b[33m', 'Cleaning client destination folder'.toUpperCase());
  fs.emptyDirSync(clientTempbuild);
  execSync(`node ${localRepoPath}/build.js ${MODULE_NAME}-ui ${APP_CLIENT_BASEURL} ${clientTempbuild} ${MODULE_NAME}`, {
    cwd: `${localRepoPath}`,
    stdio: 'inherit',
  });

  console.log('\x1b[33m', 'Building client build folder'.toUpperCase());
  let clientbuild = './build';
  if (!fs.existsSync(clientbuild)) {
    fs.mkdirSync(clientbuild);
  }
  clientbuild = path.join(clientbuild, 'client');
  fs.emptyDirSync(clientbuild);
  fs.copySync(`${localRepoPath}/dist/spa`, clientbuild);

  console.log('\x1b[33m', 'Cleaning build folders'.toUpperCase());
  clearBuildFolders(localRepoPath, clientbuild);
  console.log('\x1b[33m', 'Client UI Deploy Complete'.toUpperCase());
};

const selfRun = () => {
  const BUILD_ARGS = process.argv.slice(2);
  console.log('\x1b[33m', `BUILD_ARGS: ${BUILD_ARGS}`);
  const MODULE = BUILD_ARGS && BUILD_ARGS.length > 1 ? BUILD_ARGS[0] : 'wgo';
  console.log('\x1b[33m', `MODULE: ${MODULE}`);
  const NODE_ENV = BUILD_ARGS && BUILD_ARGS.length > 2 ? BUILD_ARGS[1] : 'development';
  console.log('\x1b[33m', `NODE_ENV: ${NODE_ENV}`);
  const PORT_ENV = BUILD_ARGS && BUILD_ARGS.length > 3 ? BUILD_ARGS[2] : '5010';
  console.log('\x1b[33m', `PORT_ENV: ${PORT_ENV}`);
  buildApi(NODE_ENV, PORT_ENV);
};

module.exports = {
  buildApi: buildApi,
  buildClient: clientBuild,
};
