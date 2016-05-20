const {createWindowsInstaller} = require('electron-winstaller');
const pkg = require('../package');

const productName = pkg.productName;
const directory = `dist/${productName}-win32-x64`;
createWindowsInstaller({
	appDirectory: directory,
	outputDirectory: directory,
	exe: `${productName}.exe`,
	setupExe: `${productName}-setup.exe`
}).then(
	() => console.log('Installer created'),
	e => console.error('Error:', e)
);
