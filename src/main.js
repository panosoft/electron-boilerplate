const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
	mainWindow.on('closed', () => mainWindow = null);
  mainWindow.webContents.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
};

const main = () => {
	app.on('ready', () => {
		createWindow();

		// TODO handle auto update logic in here
		const send = mainWindow.webContents.send.bind(mainWindow.webContents);
		const autoUpdater = electron.autoUpdater;
    const ipc = require('ipcMain');
		const version = app.getVersion();
		const os = require('os');
		const platform = os.platform() === 'darwin' ? 'osx' : os.platform();
		const url = `http://panosoft-nuts.herokuapp.com/update/${platform}/${version}`;
		autoUpdater.on('error', (event, error) => send('autoUpdater:error', error));
		autoUpdater.on('checking-for-update', () => send('autoUpdater:checking-for-update:', url));
		autoUpdater.on('update-not-available', () => send('autoUpdater:update-not-available'));
    autoUpdater.on('update-available', () => send('autoUpdater:update-available'));
    autoUpdater.on('update-downloaded', (...args) => send('autoUpdater:update-downloaded', ...args));
		ipc.on('quit-and-install', (event) => {
			console.log('quit-and-install', event);
			autoUpdater.quitAndInstall();
		});
		mainWindow.webContents.on('did-finish-load', () => {
			autoUpdater.setFeedURL(url);
			send('message', 'checking for updates');
			console.log('check-for-update');
			autoUpdater.checkForUpdates();
		});

	});
	app.on('window-all-closed', () => {
	  if (process.platform !== 'darwin') app.quit();
	});
	app.on('activate', () => {
	  if (mainWindow === null) createWindow();
	});


	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.
};

module.exports = main;
