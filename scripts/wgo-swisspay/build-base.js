const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const build = () => {
  const projectPath = "./modules/wgo-swisspay";
  const sourceFiles = ["package.json", "package-lock.json", ".npmrc"];

  sourceFiles.forEach((file) => {
    fs.copySync(
      `${projectPath}/src/wgo-base/${file}`,
      `${projectPath}/build/wgo-base/${file}`
    );
  });

  console.log("npm install wgo-base build on swisspay server and client");
  execSync("npm ci --quiet --only=production --unsafe-perm=true --allow-root", {
    cwd: "./modules/wgo-swisspay/build/wgo-base",
    stdio: "inherit",
  });
};

module.exports = {
  build: build,
};
