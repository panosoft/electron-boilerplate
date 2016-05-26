const {createWindowsInstaller} = require('electron-winstaller');
const pkg = require('../package');

const name = pkg.name;
const productName = pkg.productName;
const version = pkg.version;
createWindowsInstaller({
	appDirectory: `dist/applications/${productName}-win32-x64`,
	outputDirectory: `dist/packages`,
	exe: `${productName}.exe`,
	setupExe: `${name}-setup-${version}.exe`
}).then(
	() => console.log('Installer created'),
	e => console.error('Error:', e)
);
