const fs = require("fs-extra");

const readPackageJson = (packageJsonPath) => {
  if (!packageJsonPath) throw new Error("Invalid parameters readPackageJson!");
  const package = fs.readJsonSync(packageJsonPath, { throws: true });
  if (!package) {
    throw "Impossible to read package.json file!";
  }
  return package;
};

const readPackageVersion = (packageJson) => {
  if (!packageJson) throw new Error("Invalid parameters readPackageVersion!");
  const splittedVersion = packageJson.version.split("-");
  if (!splittedVersion || !splittedVersion.length || !splittedVersion[1]) {
    throw "Impossible to read package version!";
  }
  const buildVersion = splittedVersion[1].split(".");
  if (!buildVersion || !buildVersion.length > 0 || !buildVersion[1]) {
    throw "Impossible to read build version number!";
  }
  return {
    version: splittedVersion[0],
    build: buildVersion[1],
    newBuild: parseInt(buildVersion[1]) + 1,
  };
};

const updatePackageVersion = (packagePathJson, version, newBuild) => {
  if (!packagePathJson || !version || !newBuild)
    throw new Error("Invalid parameters updatePackageVersion!");
  const packageJson = readPackageJson(packagePathJson);
  packageJson.version = `${version}-build.${newBuild}`;
  fs.writeJsonSync(packagePathJson, packageJson);
};

module.exports = {
  readPackageJson: readPackageJson,
  readPackageVersion: readPackageVersion,
  updatePackageVersion: updatePackageVersion,
};
