const { execSync } = require("child_process");

console.log("UPGRADING SOLUTION BUILD VERSION");

const packageJsonUtils = require("./utils/packageJson");

execSync("git rebase", { stdio: "inherit" });

const basePackagePath = "./package.json";
const package = packageJsonUtils.readPackageJson(basePackagePath);
const packageVersion = packageJsonUtils.readPackageVersion(package);
packageJsonUtils.updatePackageVersion(
  basePackagePath,
  packageVersion.version,
  packageVersion.newBuild
);

execSync(`git add ${basePackagePath}`, { stdio: "inherit" });

const ServerUpdater = require("./server-version-update");
ServerUpdater.update(packageVersion.version, packageVersion.newBuild);

execSync(`git commit -m "Update build version to "${package.version}`, {
  stdio: "inherit",
});

console.log("Rebasing application library...");
execSync("git rebase", { stdio: "inherit" });

console.log("Push application library...");
execSync("git push", { stdio: "inherit" });

console.log(
  "SOLUTION BUILD VERSION UPDATE COMPLETED!\n",
  `version: ${packageVersion.version}\n`,
  `build: ${packageVersion.newBuild}\n`
);
