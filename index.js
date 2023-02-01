const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config();

const isDebug = process.env.NODE_ENV === "development";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  //https://www.electronjs.org/docs/latest/tutorial/quick-start#open-a-window-if-none-are-open-macos
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

if (isDebug) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}
