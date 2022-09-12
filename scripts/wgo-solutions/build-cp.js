const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
//   web_host: app_web_host,
//   module: module_env,
// };
const build = (options) => {
  const buildPath = `./modules/${options.module}/build`;
  console.log(path.normalize(path.resolve(buildPath)));
  console.log(path.normalize(options.web_root));
  if (path.normalize(path.resolve(buildPath)) !== path.normalize(options.web_root)) {
    fs.emptyDirSync(options.web_root);
    console.log(`copy project build to web_root path: ${options.web_root}`);
    fs.copySync(buildPath, options.web_root);
  }
};

module.exports = {
  build: build,
};
