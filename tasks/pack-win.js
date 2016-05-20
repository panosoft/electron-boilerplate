const {createWindowsInstaller} = require('electron-winstaller');
const pkg = require('../package');

const productName = pkg.productName;
const version = pkg.version;
createWindowsInstaller({
	appDirectory: `app/${productName}-win32-x64`,
	outputDirectory: `dist`,
	exe: `${productName}.exe`,
	setupExe: `${productName} Setup ${version}.exe`
}).then(
	() => console.log('Installer created'),
	e => console.error('Error:', e)
);
