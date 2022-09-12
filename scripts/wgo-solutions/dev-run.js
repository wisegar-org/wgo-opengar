const { execSync } = require("child_process");
const { createSymlinkSync, existsSync } = require("fs-extra");

const build_args = process.argv.slice(2);
console.log(`BUILD_ARGS: ${build_args}`);

if (!build_args || build_args.length < 1)
  throw "Params pipeline not provided. Please provide: module_name";

const module_name = build_args[0] ? build_args[0] : "wgo-swisspay";
console.log("\x1b[34m", `PROJECT: ${module_name}`);

console.log("npm install wgo-base");
execSync("npm install", {
  cwd: "./modules/wgo-base",
  stdio: "inherit",
});
createSymlinkSync(
  "./modules/wgo-base",
  `./modules/${module_name}/src/wgo-base`,
  "junction"
);
createSymlinkSync(
  "./modules/wgo-base",
  `./modules/${module_name}/client/src/wgo-base`,
  "junction"
);

if (existsSync(`./modules/${module_name}/mobile`)) {
  createSymlinkSync(
    "./modules/wgo-base",
    `./modules/${module_name}/mobile/src/wgo-base`,
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
