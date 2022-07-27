const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const dotenv = require("dotenv");

// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
// };
const build = (options) => {
  const projectPath = "./modules/wgo-swisspay";
  console.log("npm install wgo-base");
  execSync("npm install", {
    cwd: "./modules/wgo-base",
    stdio: "inherit",
  });
  fs.createSymlinkSync(
    "./modules/wgo-base",
    "./modules/wgo-swisspay/src/wgo-base",
    "junction"
  );

  console.log("npm install wgo-swissspay");
  execSync("npm install", {
    cwd: "./modules/wgo-swisspay",
    stdio: "inherit",
  });

  console.log("npm install wgo-swissspay");
  execSync("npm install", {
    cwd: "./modules/wgo-swisspay",
    stdio: "inherit",
  });
  console.log("build wgo-swissspay");
  execSync("npm run build", {
    cwd: "./modules/wgo-swisspay",
    stdio: "inherit",
  });

  fs.copySync(`${projectPath}/settings`, `${projectPath}/build/settings`);

  const envFilePath = `${projectPath}/build/.env`;
  fs.writeFileSync(envFilePath, `NODE_ENV=${options.env} \n`, function (err) {
    if (err) return console.log(err);
  });
  fs.appendFileSync(envFilePath, `PORT=${options.port} \n`);
  fs.appendFileSync(envFilePath, `APP_WEB_ROOT=${options.web_root} \n`);
  fs.appendFileSync(
    envFilePath,
    `CLIENT_WEB_ROOT=${path.join(options.web_root, "client")} \n`
  );
  fs.appendFileSync(
    envFilePath,
    `SETTINGS_PATH=${path.join(options.web_root, "settings")} \n`
  );

  const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];
  const settingsFiles = [
    "settings.json",
    "settings.staging.json",
    "settings.development.json",
  ];

  sourceFiles.forEach((file) => {
    fs.copySync(`${projectPath}/${file}`, `${projectPath}/build/${file}`);
  });

  fs.emptyDirSync(`${projectPath}/build/settings`);
  const env = dotenv.config({
    path: `${projectPath}/.env`,
  });
  let settingsPath = `${projectPath}/settings`;
  if (env.parsed.SETTINGS_PATH) {
    settingsPath = env.parsed.SETTINGS_PATH.startsWith(".")
      ? path.join(projectPath, env.parsed.SETTINGS_PATH)
      : env.parsed.SETTINGS_PATH;
  }
  if (fs.existsSync(settingsPath)) {
    settingsFiles.forEach((file) => {
      if (fs.existsSync(`${settingsPath}/${file}`)) {
        fs.copySync(
          `${settingsPath}/${file}`,
          `${projectPath}/build/settings/${file}`
        );
      }
    });
  }

  console.log("npm install wgo-swissspay build");
  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: "./modules/wgo-swisspay/build",
    stdio: "inherit",
  });
};

module.exports = {
  build: build,
};
