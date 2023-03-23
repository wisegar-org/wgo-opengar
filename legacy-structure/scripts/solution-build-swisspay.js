const { execSync } = require("child_process");

console.log("npm install wgo-base");
execSync("npm install", {
  cwd: "./modules/wgo-base",
  stdio: "inherit",
});

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
  cwd: "./modules/wgo-swisspay/client",
  stdio: "inherit",
});
