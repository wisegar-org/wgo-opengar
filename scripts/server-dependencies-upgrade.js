const fs = require("fs-extra");
const { execSync } = require("child_process");

console.log("UPGRADING APPLICATION LIBRARIES");

console.log("Upgrading dependencies");
execSync("npx rimraf node_modules/@wisegar-org/wgo-opengar-shared", {
  cwd: "./server",
  stdio: "inherit",
});
execSync("npm install @wisegar-org/wgo-opengar-shared@latest --save", {
  cwd: "./server",
  stdio: "inherit",
});
execSync("npx rimraf node_modules/@wisegar-org/wgo-opengar-core", {
  cwd: "./server",
  stdio: "inherit",
});
execSync("npm install @wisegar-org/wgo-opengar-core@latest --save", {
  cwd: "./server",
  stdio: "inherit",
});

console.log("Building application library...");
execSync("npx tsc", { cwd: "./server", stdio: "inherit" });

console.log("Adding package.json changes commit...");
execSync("git add *.json", { stdio: "inherit" });
// execSync(`git commit -m "Upgrade dependecies libraries to last versions"`, {
//   stdio: "inherit",
// });
// execSync(`git push`);

console.log("DEPENDENCIES UPGRADE COMPLETED!");
