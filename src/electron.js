const electron = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
	win = new electron.BrowserWindow({
		title: 'Formula Manager',
		width: 1000,
		height: 800
	});

	win.setMenu(null);

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, `/../dist/browser/index.html`),
			protocol: 'file:',
			slashes: true,
		})
	);

	win.on('closed', () => {
		win = null;
	});
}

electron.app.on('ready', createWindow);
electron.app.on('activate', () => { if(win === null) createWindow(); });
