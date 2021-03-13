import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow } from './window';
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');

const windowOptions = { serve: serve };


let win: BrowserWindow;
// Start App
try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(() => createWindow(windowOptions), 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  ipcMain.handle('load-json', (event, arg) => {
    return 'meh';
  });

  ipcMain.handle('write-json', (event, arg) => {
    return 'muh';
  })

} catch (e) {
  // Catch Error
  // throw e;
}
