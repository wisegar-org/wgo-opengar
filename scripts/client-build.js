// const buildOptions = {
//   env: env,
//   port: port,
//   web_root: web_root,
//   base_url: base_url,
//   graphql_url: graphql_url,
//   app_name: app_name,
//   app_root: app_root,
//   client_app_root: client_app_root,
//   server_root: serverRoot,
//   client_root: clientRoot,
// };

const build = (options) => {
  const fs = require("fs-extra");
  const path = require("path");
  const { execSync } = require("child_process");

  console.log("Building client application...");

  const packageJson = fs.readJsonSync("package.json", {
    cwd: __dirname,
    throws: true,
  });
  if (!packageJson || !packageJson.version) {
    console.error("Impossible to read package.json file!");
  }
  const settingsBuild = path.join(options.client_root, "settings.build.json");
  fs.writeJsonSync(
    settingsBuild,
    {
      API_BASE: options.base_url,
      API_GRAPHQL: options.graphql_url,
      VERSION: packageJson.version,
    },
    { cwd: options.client_root, throws: true }
  );

  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }
  fs.emptyDirSync("dist");

  execSync(`npm install`, { cwd: options.client_root, stdio: "inherit" });

  execSync(`npx quasar build`, { cwd: options.client_root, stdio: "inherit" });

  if (!fs.existsSync(options.client_app_root)) {
    fs.mkdirSync(options.client_app_root);
  }
  fs.emptyDirSync(options.client_app_root);

  const buildDistFolder = path.join(options.client_root, "dist", "spa");
  fs.copySync(buildDistFolder, options.client_app_root, {
    cwd: options.client_root,
  });

  console.log("Client build completed");
};

module.exports = {
  build: build,
};
