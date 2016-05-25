const appDmg = require('appdmg');
const pkg = require('../package');
const rm = require('rimraf');

const dmg = () => {
  const basepath = '.';
  const target = `dist/packages/${pkg.name}-${pkg.version}.dmg`;
  const specification = {
    title: 'Install',
    icon: 'resources/icon.icns',
    'icon-size': 80,
    contents: [
  		{ x: 190, y: 300, type: 'file', path: 'dist/applications/App Name-darwin-x64/App Name.app' },
      { x: 450, y: 300, type: 'link', path: '/Applications' }
    ]
  };
  rm.sync(target);
  const dmg = appDmg({target, basepath, specification});
  dmg.on('error', error => console.error(error));
  dmg.on('finish', () => console.log(`dmg created: ${target}`));
};
dmg();


const zip = () => {
  const path = require('path');
  const {spawn} = require('child_process');
  const zip = require('7zip-bin').path7za;
  const target = `dist/applications/${pkg.productName}-darwin-x64/${pkg.productName}.app`;
  const output = `dist/packages/${pkg.name}-${pkg.version}-mac.zip`;
  rm.sync(output);
  const cwd = path.dirname(target);
  const options = {cwd, stdio: ['ignore', 'ignore', 'inherit']};
  // maximum: '-mfb=258', '-mpass=15'
  // deflate: '-mm=Deflate'
  // store: '-mm=Copy'
  const args = ['a', '-mfb=258', '-mpass=15', path.relative(cwd, output), path.relative(cwd, target)];
  const cp = spawn(zip, args, options);
  cp.on('close', () => console.log(`zip created: ${output}`));
  cp.on('error', error => console.error(error));
};
zip();
