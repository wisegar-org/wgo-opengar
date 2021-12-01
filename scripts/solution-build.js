console.log("START BUILDING & DEPLOYING");
const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 4)
  throw "Params pipeline not provided. Please provide: environment server_port app_web_root module_to_build";

const node_env = build_args[0] ? build_args[0] : "development";
console.log("\x1b[34m", `NODE_ENV: ${node_env}`);

const port_env = build_args[1] ? build_args[1] : "5010";
console.log("\x1b[34m", `PORT_ENV: ${port_env}`);

const web_root_env = build_args[2] ? build_args[2] : "/users/yarielre/web";
console.log("\x1b[34m", `WEB_ROOT_ENV: ${web_root_env}`);

const module_env = build_args[3] ? build_args[3] : "wgo";
console.log("\x1b[34m", `MODULE_ENV: ${module_env}`);

const path = require("path");
const { execSync } = require("child_process");

console.log("Running npm install...");
execSync("set PUPPETEER_SKIP_DOWNLOAD", { stdio: "inherit" });
execSync("npm install", { stdio: "inherit" });

const appRoot = path.join(__dirname, "..");
const serverRoot = path.join(appRoot, `server`);
const clientRoot = path.join(appRoot, `client`);

const buildOptions = {
  env: node_env,
  port: port_env,
  module: module_env,
  web_root: web_root_env,
  app_root: appRoot,
  server_root: serverRoot,
  client_root: clientRoot,
};

const serverBuilder = require(`./server-build`);
serverBuilder.build(buildOptions);

const clientBuilder = require(`./client-build`);
clientBuilder.build(buildOptions);

console.log("COMPLETED BUILDING & DEPLOYING QUICKWEB");
