/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs-extra');

console.log('\x1b[33m', '*** SETTING UI THEME ***');

const settings = fs.readJsonSync('settings.build.json', { throws: true });
if (!settings || !settings.MODULES) {
  throw 'Impossible to read settings.build.json file!';
}

const MODULE = settings.MODULES;
console.log('\x1b[33m', `Setting theme of module ${MODULE}...`);

// Copy favicon file, if exist, in modules to src/css project folder
if (fs.existsSync(`./src/modules/${MODULE}/css`)) {
  console.log('\x1b[33m', 'Copy theme css module...');
  fs.copySync(`./src/modules/${MODULE}/css`, './src/css', {
    overwrite: true
  });
} else {
  console.log('\x1B[31m', 'Module not contain css folder');
}

// Copy favicon file, if exist, in modules to public folder
if (fs.existsSync(`./src/modules/${MODULE}/favicon.ico`)) {
  console.log('\x1b[33m', 'Copy favicon in module...');
  fs.copySync(`./src/modules/${MODULE}/favicon.ico`, './public/favicon.ico', {
    overwrite: true
  });
} else {
  console.log('\x1B[31m', 'Module not contain favicon file');
}

if (fs.existsSync(`./src/modules/${MODULE}/settings.json`)) {
  const packageJson = fs.readJsonSync('package.json', { throws: true });
  if (!settings || !settings.MODULES) {
    throw 'Impossible to read package.json file!';
  }

  const moduleSettings = fs.readJsonSync(
    `./src/modules/${MODULE}/settings.json`,
    { throws: true }
  );
  if (!settings || !settings.MODULES) {
    throw 'Impossible to read package.json file!';
  }

  if (moduleSettings.productName) {
    packageJson.productName = moduleSettings.productName;
    console.log('\x1b[33m', 'Writing App Title in package.json...');
    fs.writeJsonSync('package.json', packageJson);
  } else {
    console.log(
      '\x1B[31m',
      'Module not contain property productName in settings.json file'
    );
  }
} else {
  console.log('\x1B[31m', 'Module not contain settings.json file');
}

console.log('\x1b[33m', '*** THEME SETTED ***');
