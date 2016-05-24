const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const updater = require('./updater');

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
    if (!isDev) updater.initialize(mainWindow);
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
