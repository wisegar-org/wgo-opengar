const update = (version, newBuild) => {
  const path = require("path");
  const { execSync } = require("child_process");
  const packageJsonUtils = require("./utils/packageJson");
  const serverPathDir = path.join(__dirname, "..");
  const serverPackagePath = path.join(serverPathDir, "server", "package.json");
  packageJsonUtils.updatePackageVersion(serverPackagePath, version, newBuild);
  execSync(`git add ${serverPackagePath}`, { stdio: "inherit" });
  console.log(
    "Server build version update completed!\n",
    `version: ${version}\n`,
    `build: ${newBuild}\n`
  );
};

module.exports = {
  update: update,
};
