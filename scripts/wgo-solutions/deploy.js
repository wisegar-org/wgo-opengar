console.log("**************WGO-SWISSPAY**************");
console.log("START BUILDING");
const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 5)
  throw "Params pipeline not provided. Please provide: environment server_port app_web_root app_web_host module";

const node_env = build_args[0] ? build_args[0] : "development";
console.log("\x1b[34m", `NODE_ENV: ${node_env}`);

const port_env = build_args[1] ? build_args[1] : "5010";
console.log("\x1b[34m", `PORT_ENV: ${port_env}`);

const web_root_env = build_args[2] ? build_args[2] : "/users/yarielre/web";
console.log("\x1b[34m", `WEB_ROOT_ENV: ${web_root_env}`);

const app_web_host = build_args[3]
  ? build_args[3]
  : `http://localhost:${port_env}`;
console.log("\x1b[34m", `WEB_ROOT_ENV: ${app_web_host}`);

const module_env = build_args[4] ? build_args[4] : "wgo-swisspay";
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
  web_host: app_web_host,
  module: module_env,
};

const buildServer = require(`./build-server`);
buildServer.build(buildOptions);

const buildClient = require(`./build-client`);
buildClient.build(buildOptions);

const buildBase = require("./build-base");
buildBase.build(buildOptions);

console.log("**************END**************");
