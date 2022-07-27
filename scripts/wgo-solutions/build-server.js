const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const dotenv = require("dotenv");

// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
//   web_host: app_web_host,
//   module: module_env,
// };
const build = (options) => {
  const projectPath = `./modules/${options.module}`;
  const baseName = path.basename(options.web_root);
  console.log("npm install wgo-base");
  execSync("npm install", {
    cwd: "./modules/wgo-base",
    stdio: "inherit",
  });
  fs.createSymlinkSync(
    "./modules/wgo-base",
    `./modules/${options.module}/src/wgo-base`,
    "junction"
  );

  console.log(`npm install ${options.module}`);
  execSync("npm install", {
    cwd: `./modules/${options.module}`,
    stdio: "inherit",
  });

  console.log(`build ${options.module}`);
  execSync("npm run build", {
    cwd: `./modules/${options.module}`,
    stdio: "inherit",
  });

  const envFilePath = `${projectPath}/build/.env`;
  fs.writeFileSync(envFilePath, `NODE_ENV=${options.env} \n`, function (err) {
    if (err) return console.log(err);
  });
  fs.appendFileSync(envFilePath, `PORT=${options.port} \n`);
  fs.appendFileSync(
    envFilePath,
    `APP_WEB_ROOT=${path.normalize(options.web_root)} \n`
  );
  fs.appendFileSync(
    envFilePath,
    `CLIENT_WEB_ROOT=${path.join(options.web_root, "client")} \n`
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
    path: `${projectPath}/.envss`,
  });
  let settingsPath = `${projectPath}/settings`;
  if (!!env.parsed && !!env.parsed.SETTINGS_PATH) {
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

    fs.appendFileSync(
      envFilePath,
      `SETTINGS_PATH=${path.resolve(
        path.join(projectPath, `/build/settings`)
      )} \n`
    );
  } else {
    fs.appendFileSync(
      envFilePath,
      `SETTINGS_PATH=${path.join(
        options.web_root,
        `../settings/${baseName}`
      )} \n`
    );
  }

  console.log(`npm install ${options.module} build`);
  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: `./modules/${options.module}/build`,
    stdio: "inherit",
  });
};

module.exports = {
  build: build,
};
