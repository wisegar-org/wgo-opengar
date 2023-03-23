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
  const projectPath = `./modules/${options.module}`;
  const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

  sourceFiles.forEach((file) => {
    fs.copySync(
      `${projectPath}/src/wgo-base/${file}`,
      `${projectPath}/build/wgo-base/${file}`
    );
  });

  console.log("npm install wgo-base build on swisspay server and client");
  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: `./modules/${options.module}/build/wgo-base`,
    stdio: "inherit",
  });
};

module.exports = {
  build: build,
};
