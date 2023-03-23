console.log("**************WGO-SWISSPAY**************");
console.log("START BUILDING");
const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 6)
  throw "Params pipeline not provided. Please provide: environment server_port app_web_root web_root_settings app_web_host module";

const node_env = build_args[0] ? build_args[0] : "development";
console.log("\x1b[34m", `NODE_ENV: ${node_env}`);

const port_env = build_args[1] ? build_args[1] : "5010";
console.log("\x1b[34m", `PORT_ENV: ${port_env}`);

const web_root_env = build_args[2] ? build_args[2] : "/users/yarielre/web";
console.log("\x1b[34m", `WEB_ROOT_ENV: ${web_root_env}`);

const web_root_settings = build_args[3]
  ? build_args[3]
  : "/users/yarielre/settings";
console.log("\x1b[34m", `WEB_ROOT_SETTINGS: ${web_root_settings}`);

const app_web_host = build_args[4]
  ? build_args[4]
  : `http://localhost:${port_env}`;
console.log("\x1b[34m", `WEB_ROOT_HOST: ${app_web_host}`);

const module_env = build_args[5] ? build_args[5] : "wgo-swisspay";
console.log("\x1b[34m", `MODULE_ENV: ${module_env}`);

const { execSync } = require("child_process");
console.log("npm install solution");
execSync("npm install", {
  cwd: "./",
  stdio: "inherit",
});

const buildOptions = {
  env: node_env,
  port: port_env,
  web_root: web_root_env,
  web_settings: web_root_settings,
  web_host: app_web_host,
  module: module_env,
};

const buildServer = require(`./build-server`);
buildServer.build(buildOptions);

const buildClient = require(`./build-client`);
buildClient.build(buildOptions, "client");
buildClient.build(buildOptions, "mobile");

const buildBase = require("./build-base");
buildBase.build(buildOptions);

// const buildCopy = require("./build-cp");
// buildCopy.build(buildOptions);

console.log("**************END**************");
