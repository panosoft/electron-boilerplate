const {app, autoUpdater, ipcMain} = require('electron');
const os = require('os');

const version = app.getVersion();
const platform = os.platform() === 'darwin' ? 'osx' : os.platform();
const url = `http://panosoft-nuts.herokuapp.com/update/${platform}/${version}`;

const initialize = (window) => {
	const webContents = window.webContents;
	const send = webContents.send.bind(window.webContents);
	autoUpdater.on('error', (event, error) => send('autoUpdater:error', error));
	autoUpdater.on('checking-for-update', (event) => send('autoUpdater:checking-for-update:', url));
	autoUpdater.on('update-not-available', (event) => send('autoUpdater:update-not-available'));
	autoUpdater.on('update-available', (event) => send('autoUpdater:update-available'));
	autoUpdater.on('update-downloaded', (event, ...args) => send('autoUpdater:update-downloaded', ...args));
	ipcMain.on('autoUpdater:quit-and-install', (event) => autoUpdater.quitAndInstall());
	ipcMain.on('autoUpdater:check-for-update', (event) => autoUpdater.checkForUpdates());
	webContents.on('did-finish-load', () => {
		autoUpdater.setFeedURL(url);
		autoUpdater.checkForUpdates();
	});
};

module.exports = {initialize};
