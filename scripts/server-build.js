// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
//   base_url: base_url,
//   graphql_url: graphql_url,
//   app_name: app_name,
//   app_root: app_root,
//   server_root: serverRoot,
//   client_root: clientRoot,
// };

const build = (options) => {
  const fs = require("fs-extra");
  const path = require("path");
  const { execSync } = require("child_process");

  const destination = path.join(`${options.server_root}`, "build");

  const sourceFiles = [
    "package.json",
    "package-lock.json",
    ".npmrc",
    "settings.json",
    "settings.development.json",
    "settings.staging.json",
  ];

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  fs.emptyDirSync(destination);

  console.log("Running npm install...");
  execSync("npm install", { cwd: options.server_root, stdio: "inherit" });

  console.log("Running tsc...");
  execSync("npx tsc", { cwd: options.server_root, stdio: "inherit" });

  console.log("Copying needed dependencies...");
  sourceFiles.forEach((file) => {
    const dir = options.server_root;
    fs.copySync(path.join(dir, file), `${destination}/${file}`);
  });

  console.log("Creating env file...");
  const ENV_FILENAME = `${destination}/.env`;
  fs.writeFileSync(ENV_FILENAME, `NODE_ENV=${options.env} \n`, function (err) {
    if (err) return console.log(err);
  });
  fs.appendFileSync(ENV_FILENAME, `PORT=${options.port} \n`);
  fs.appendFileSync(ENV_FILENAME, `APP_WEB_ROOT=${options.app_root} \n`);

  console.log("Deploying application files...");
  if (!fs.existsSync(options.app_root)) {
    fs.mkdirSync(options.app_root);
  }
  fs.emptyDirSync(options.app_root);
  fs.copySync(destination, options.app_root);
  fs.removeSync(destination);

  execSync("npm ci --quiet --only=production", {
    cwd: `${options.app_root}`,
    stdio: "inherit",
  });

  console.log("Server application build complete.");
};

module.exports = {
  build: build,
};
