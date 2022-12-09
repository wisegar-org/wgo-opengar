const fs = require("fs-extra");
const { execSync } = require("child_process");

console.log("[quick] building quickweb core ui");

const destination = "./build/";
const source = "./src/";

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}
fs.emptyDirSync(destination);

console.log("[wgo] installing dependencies");
execSync("npm install", { stdio: "inherit" });

console.log("[wgo] transpiling code");
execSync("npx tsc", { stdio: "inherit" });

console.log("[wgo] deploying ui files");
fs.copySync(source, destination, {
  overwrite: false,
  recursive: true,
});

console.log("[wgo] build complete");
process.exit(0);
