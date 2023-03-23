const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
//   module: module,
//   app_root: app_root,
//   server_root: serverRoot,
//   client_root: clientRoot,
// };
const build = (options) => {
  process.chdir(options.server_root);
  const settingsFileName =
    options.env === "production"
      ? "settings.json"
      : `settings.${options.env}.json`;
  const deploySettings = fs.readJsonSync(
    `./src/modules/${options.module}/${settingsFileName}`,
    { throws: false }
  );
  deploySettings.WEB_ROOT = options.web_root;
  fs.writeJsonSync(
    `./src/modules/${options.module}/${settingsFileName}`,
    deploySettings
  );

  const MODULE_NAME = deploySettings.NAME;
  console.log("\x1b[33m", `MODULE_NAME: ${MODULE_NAME}`);

  const APP_NAME = deploySettings.APP_NAME;
  console.log("\x1b[33m", `APP_NAME: ${APP_NAME}`);

  const WEB_ROOT = deploySettings.WEB_ROOT;
  console.log("\x1b[33m", `WEB_ROOT: ${WEB_ROOT}`);

  const APP_WEB_ROOT = path.join(WEB_ROOT, APP_NAME);
  console.log("\x1b[33m", `APP_WEB_ROOT: ${APP_WEB_ROOT}`);

  const API_BASEURL = `${deploySettings.API_BASEURL}:${options.port}`;
  console.log("\x1b[33m", `API_BASE: ${API_BASEURL}`);

  const API_TOKEN = deploySettings.GITHUB_API_TOKEN || "API_TOKEN";
  console.log(
    "\x1b[33m",
    `API_TOKEN: ${deploySettings.GITHUB_API_TOKEN ? API_TOKEN : "NULL"}`
  );

  const destination = path.join(options.app_root, "build");
  const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];
  const moduleFiles = [
    "settings.json",
    "settings.staging.json",
    "settings.development.json",
  ];

  console.log("\x1b[33m", "Cleaning build destination folder".toUpperCase());
  fs.emptyDirSync(destination);

  console.log("\x1b[33m", "Installing dependencies".toUpperCase());
  execSync("npm install --unsafe-perm=true --allow-root", { stdio: "inherit" });

  console.log("\x1b[33m", "Transpiling the application code".toUpperCase());
  execSync("npx tsc", { stdio: "inherit" });

  console.log("\x1b[33m", "Building options.env file".toUpperCase());
  const ENV_FILENAME = `${destination}/.env`;
  fs.writeFileSync(ENV_FILENAME, `NODE_ENV=${options.env} \n`, function (err) {
    if (err) return console.log(err);
  });
  fs.appendFileSync(ENV_FILENAME, `PORT=${options.port} \n`);
  fs.appendFileSync(ENV_FILENAME, `MODULES=${[MODULE_NAME]} \n`);
  fs.appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${[APP_WEB_ROOT]} \n`);
  fs.appendFileSync(ENV_FILENAME, `API_TOKEN=${[API_TOKEN]} \n`);

  console.log(
    "\x1b[33m",
    "Updating build settings & dependencies".toUpperCase()
  );
  sourceFiles.forEach((file) => {
    fs.copySync(file, `${destination}/${file}`);
  });

  moduleFiles.forEach((file) => {
    fs.copySync(
      `./src/modules/${MODULE_NAME}/${file}`,
      `${destination}/${file}`
    );
  });

  fs.copySync("./build", `${destination}`);

  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: `${destination}`,
    stdio: "inherit",
  });

  console.log("\x1b[33m", "Deployment complete".toUpperCase());
};

module.exports = {
  build: build,
};
