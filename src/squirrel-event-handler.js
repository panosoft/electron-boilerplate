const app = require('electron').app;
const path = require('path');
const spawn = require('child_process').spawn;

const appExe = path.basename(process.execPath);
const update = args => new Promise((resolve, reject) => {
	const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
	spawn(updateExe, args, {detached: true}).on('close', resolve);
});

const handle = event => {
	switch (event) {
		case '--squirrel-install':
			update([`--createShortcut=${appExe}`]).then(app.quit);
			break;
		case '--squirrel-updated':
			update([`--createShortcut=${appExe}`]).then(app.quit);
			break;
		case '--squirrel-uninstall':
			update([`--removeShortcut=${appExe}`]).then(app.quit);
			break;
		case '--squirrel-obsolete':
			app.quit();
			break;
		default:
			break;
	}
};

module.exports = handle;
