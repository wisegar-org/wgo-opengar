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
  const MODULE_NAME = deploySettings.NAME;

  console.log("\x1b[33m", `MODULE_NAME: ${MODULE_NAME}`);
  process.chdir(options.client_root);
  execSync("npm install", { stdio: "inherit" });
  const APP_CLIENT_BASEURL = deploySettings.APP_CLIENT_BASEURL;
  console.log("dirname", __dirname);
  console.log("\x1b[33m", `APP_CLIENT_BASEURL: ${APP_CLIENT_BASEURL}`);

  const clientTempBuild = "./dist";
  console.log("\x1b[33m", "Cleaning client destination folder".toUpperCase());
  fs.emptyDirSync(clientTempBuild);
  execSync(
    `node ./build.js ${MODULE_NAME}-ui ${APP_CLIENT_BASEURL} ${clientTempBuild} ${MODULE_NAME}`,
    {
      stdio: "inherit",
    }
  );

  console.log("\x1b[33m", "Building client build folder".toUpperCase());
  let clientbuild = path.join(options.app_root, "build");
  if (!fs.existsSync(clientbuild)) {
    fs.mkdirSync(clientbuild);
  }
  clientbuild = path.join(clientbuild, "client");
  fs.emptyDirSync(clientbuild);
  fs.copySync(`./dist/spa`, clientbuild);

  console.log("\x1b[33m", "Client UI Deploy Complete".toUpperCase());
};

module.exports = {
  build: build,
};
