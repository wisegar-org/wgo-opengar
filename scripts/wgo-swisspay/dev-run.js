const { execSync } = require("child_process");
const { createSymlinkSync } = require("fs-extra");

console.log("npm install wgo-base");
execSync("npm install", {
  cwd: "./modules/wgo-base",
  stdio: "inherit",
});
createSymlinkSync(
  "./modules/wgo-base",
  "./modules/wgo-swisspay/src/wgo-base",
  "junction"
);
createSymlinkSync(
  "./modules/wgo-base",
  "./modules/wgo-swisspay/client/src/wgo-base",
  "junction"
);

console.log("npm install wgo-swissspay client");
execSync("npm install", {
  cwd: "./modules/wgo-swisspay/client",
  stdio: "inherit",
});

console.log("build wgo-swissspay client");
execSync("npx quasar build", {
  cwd: "./modules/wgo-swisspay/client",
  stdio: "inherit",
});

console.log("npm install wgo-swissspay");
execSync("npm install", {
  cwd: "./modules/wgo-swisspay",
  stdio: "inherit",
});

console.log("npm start wgo-swissspay");
execSync("npm start", {
  cwd: "./modules/wgo-swisspay",
  stdio: "inherit",
});
