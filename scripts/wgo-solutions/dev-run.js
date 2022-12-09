const { execSync } = require("child_process");
const { createSymlinkSync, existsSync, emptyDirSync, unlinkSync, mkdirSync, removeSync } = require("fs-extra");
const { resolve } = require('path')

const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 1)
  throw "Params pipeline not provided. Please provide: module_name";

const module_name = build_args[0] ? build_args[0] : "wgo-swisspay";
console.log("\x1b[34m", `PROJECT: ${module_name}`);

if (existsSync(`./modules/${module_name}/src/wgo-base`)) {
  removeSync(`./modules/${module_name}/src/wgo-base`)
}
mkdirSync(`./modules/${module_name}/src/wgo-base`)
createSymlinkSync(
  "./modules/wgo-base/models",
  `./modules/${module_name}/src/wgo-base/models`,
  "junction"
);
createSymlinkSync(
  "./modules/wgo-base/server",
  `./modules/${module_name}/src/wgo-base/server`,
  "junction"
);

if (existsSync(`./modules/${module_name}/client/src/wgo-base`)) {
  removeSync(`./modules/${module_name}/client/src/wgo-base`)
}
mkdirSync(`./modules/${module_name}/client/src/wgo-base`)
createSymlinkSync(
  "./modules/wgo-base/models",
  `./modules/${module_name}/client/src/wgo-base/models`,
  "junction"
);
createSymlinkSync(
  "./modules/wgo-base/client",
  `./modules/${module_name}/client/src/wgo-base/client`,
  "junction"
);


if (existsSync(`./modules/${module_name}/mobile`)) {
  if (existsSync(`./modules/${module_name}/mobile/src/wgo-base`)) {
    removeSync(`./modules/${module_name}/mobile/src/wgo-base`)
  }
  mkdirSync(`./modules/${module_name}/mobile/src/wgo-base`)
  createSymlinkSync(
    "./modules/wgo-base/models",
    `./modules/${module_name}/mobile/src/wgo-base/models`,
    "junction"
  );
  createSymlinkSync(
    "./modules/wgo-base/client",
    `./modules/${module_name}/mobile/src/wgo-base/client`,
    "junction"
  );

  console.log(`npm install ${module_name} mobile`);
  execSync("npm install", {
    cwd: `./modules/${module_name}/mobile`,
    stdio: "inherit",
  });

  console.log(`build ${module_name} mobile`);
  execSync("npx quasar build", {
    cwd: `./modules/${module_name}/mobile`,
    stdio: "inherit",
  });
}

console.log(`npm install ${module_name} client`);
execSync("npm install", {
  cwd: `./modules/${module_name}/client`,
  stdio: "inherit",
});

console.log(`build ${module_name} client`);
execSync("npx quasar build", {
  cwd: `./modules/${module_name}/client`,
  stdio: "inherit",
});

console.log(`npm install ${module_name}`);
execSync("npm install", {
  cwd: `./modules/${module_name}`,
  stdio: "inherit",
});

console.log(`npm start ${module_name}`);
execSync("npm start", {
  cwd: `./modules/${module_name}`,
  stdio: "inherit",
});
