import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    title: 'Formula Manager',
    width: 1000,
    height: 800
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/FormulaManager2/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
