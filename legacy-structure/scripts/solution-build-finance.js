console.log("\x1b[34m", "BUILDING & DEPLOYING OPENGAR");
const build_args = process.argv.slice(2);
const pathScript = __dirname;
process.chdir(pathScript);
const { execSync } = require("child_process");
execSync(`node ./solution-build.js ${build_args.join(" ")} finance`, {
  stdio: "inherit",
});
