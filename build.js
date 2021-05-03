const fs = require("fs-extra");
const { execSync } = require("child_process");

console.log("\x1b[33m", "BUILDING & DEPLOYING OPENGAR API");
const destination = "./build";
const sourceFiles = [
  "package.json",
  "package-lock.json",
  ".npmrc",
  ".env",
  "node_modules",
];

const APP_DEAMON_NAME = "wgo-opengar-api";
const APP_WEB_ROOT = `C:\\Web\\Sites\\${APP_DEAMON_NAME}`;
const APP_START_FILE = `${APP_WEB_ROOT}\\index.js`;

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}
fs.emptyDirSync(destination);

console.log("\x1b[33m", "Running npm install...");
execSync("npm install", { stdio: "inherit" });

console.log("\x1b[33m", "Running tsc...");
execSync("tsc", { stdio: "inherit" });

sourceFiles.forEach((file) => {
  fs.copySync(file, `${destination}/${file}`);
});

const pm2 = require("pm2");
pm2.connect(function (err) {
  if (err) {
    console.log("\x1b[31m", "Impossible to stablish  pm2 connection...!", err);
    process.exit(2);
  }
  pm2.list((err, list) => {
    if (err) {
      console.log("\x1b[31m", "Impossible to list pm2 deamon list...");
      pm2.disconnect();
      process.exit(2);
    }
    const appDemon = list
      ? list.find((app) => app.name === APP_DEAMON_NAME)
      : undefined;
    if (appDemon) {
      console.log("\x1b[33m", "Application founded!");
      console.log("\x1b[33m", "Stopping application deamon!");
      pm2.stop(APP_DEAMON_NAME, (err, proc) => {
        console.log("\x1b[33m", "Deploying application files...");
        fs.removeSync(APP_WEB_ROOT);
        fs.copySync("build", APP_WEB_ROOT);
        console.log("\x1b[33m", "Restarting application deamon...");
        pm2.start(APP_DEAMON_NAME, (err, proc) => {
          pm2.disconnect();
          console.log("\x1b[33m", "Application restarted!");
          process.exit(0);
        });
      });
    } else {
      console.log("\x1b[33m", "Application not found!");
      console.log("\x1b[33m", "Deploying application files...");
      fs.removeSync(APP_WEB_ROOT);
      fs.copySync("build", APP_WEB_ROOT);
      console.log("\x1b[33m", "Adding application Deamon!");
      pm2.start(
        {
          name: APP_DEAMON_NAME,
          script: APP_START_FILE,
          max_memory_restart: "200M",
        },
        (err, apps) => {
          execSync("pm2 save", { stdio: "inherit" });
          pm2.disconnect();
          if (err) {
            console.log("\x1b[31m", "Impossible to start the app deamon");
            process.exit(2);
          }
          console.log("\x1b[33m", "Application started!");
          process.exit(0);
        }
      );
    }
  });
});
