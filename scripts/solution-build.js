const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

console.log("BUILDING & DEPLOYING QUICKWEB");

const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 4)
  throw "Params pipeline not provided. Please provide: environment, server_port, web_root, url_base";

const env = build_args[0];
console.log(`NODE_ENV: ${env}`);

const port = build_args[1];
console.log(`PORT_ENV: ${port}`);

const web_root = build_args[2];
console.log(`WEB_ROOT: ${web_root}`);

const base_url = build_args[3];
console.log(`URL_BASE: ${base_url}`);

const app_name = `quickweb-${env}`;

const app_root = path.join(`${web_root}`, app_name);
console.log(`APP_ROOT: ${app_root}`);

const client_app_root = path.join(`${web_root}`, app_name, "client");
console.log(`CLIENT_APP_ROOT: ${client_app_root}`);

const graphql_url = `${base_url}/graphql`;
console.log(`API_GRAPHQL: ${graphql_url}`);

const serverRoot = path.join(path.join(__dirname, ".."), `server`);
const clientRoot = path.join(path.join(__dirname, ".."), `client`);

console.log("Running npm install...");
execSync("npm install", { cwd: path.join(__dirname, ".."), stdio: "inherit" });

const buildOptions = {
  env: env,
  port: port,
  web_root: web_root,
  base_url: base_url,
  graphql_url: graphql_url,
  app_name: app_name,
  app_root: app_root,
  server_root: serverRoot,
  client_app_root: client_app_root,
  client_root: clientRoot,
};

const serverBuilder = require(`./server-build`);
serverBuilder.build(buildOptions);

const clientBuilder = require(`./client-build`);
clientBuilder.build(buildOptions);

console.log("COMPLETED BUILDING & DEPLOYING QUICKWEB");
