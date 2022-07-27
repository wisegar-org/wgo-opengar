const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
// };
const build = (options) => {
  const projectPath = "./modules/wgo-swisspay";
  fs.createSymlinkSync(
    "./modules/wgo-base",
    `${projectPath}/client/src/wgo-base`,
    "junction"
  );

  console.log("npm install wgo-swissspay client");
  execSync("npm install", {
    cwd: `${projectPath}/client`,
    stdio: "inherit",
  });

  const envFilePath = `${projectPath}/client/.env`;
  if (fs.existsSync(envFilePath)) {
    fs.unlinkSync(envFilePath);
  }
  fs.writeFileSync(envFilePath, `PORT=${options.port} \n`, function (err) {
    if (err) return console.log(err);
  });

  console.log("build wgo-swissspay client");
  execSync("npx quasar build", {
    cwd: `${projectPath}/client`,
    stdio: "inherit",
  });
  fs.unlinkSync(envFilePath);

  fs.copySync(`${projectPath}/client/dist/spa`, `${projectPath}/build/client`);

  const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

  sourceFiles.forEach((file) => {
    fs.copySync(
      `${projectPath}/client/${file}`,
      `${projectPath}/build/client/${file}`
    );
  });

  console.log("npm install wgo-swissspay client build");
  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: `${projectPath}/build/client`,
    stdio: "inherit",
  });
};

module.exports = {
  build: build,
};
