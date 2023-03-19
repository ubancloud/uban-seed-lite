import {autoUpdater} from "electron-updater";
import {app,ipcMain} from 'electron'
export  default (win)=> {
    global.isUpdateAvailable=false;
    const returnData = {
        error: { status: -1, msg: "检测更新异常" },
        checking: { status: 0, msg: "正在检查应用程序更新" },
        updateAva: { status: 1, msg: "检测到新版本，正在下载,请稍后" },
        updateNotAva: { status: 2, msg: "您现在使用的版本为最新版本,无需更新!" },
        updateReady: { status: 3, msg: "更新完毕" }
    };
    // 通过main进程发送事件给renderer进程，提示更新信息
    const sendUpdateMessage=(obj)=> {
        if (win) {
            win.webContents.send("update-message", obj);
        }
    }
    //vue.config.json配置的一样
    autoUpdater.setFeedURL("https://developer.lentrue.com/update/");

    //更新错误
    autoUpdater.on("error", function (error) {
        sendUpdateMessage(returnData.error);
    });

    //检查中
    autoUpdater.on("checking-for-update", async function () {
        sendUpdateMessage(returnData.checking);
    });

    //发现新版本
    //当发现一个可用更新的时候，更新包下载会自动开始
    autoUpdater.on("update-available", function (info) {
        sendUpdateMessage({...returnData.updateAva,info});
    });

    //当前版本为最新版本
    autoUpdater.on("update-not-available", function (info) {
        global.isUpdateAvailable=false;
        setTimeout(function () {
            sendUpdateMessage(returnData.updateNotAva);
        }, 1000);
    });

    // 更新下载进度事件
    autoUpdater.on("download-progress", function (progressObj) {
        if (win) {
            win.webContents.send("downloadProgress", progressObj);
        }
    });

    autoUpdater.on("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        global.isUpdateAvailable=true;
        sendUpdateMessage(returnData.updateReady);
    });

    ipcMain.handle("quitAndInstall", (event, data) => {
        autoUpdater.quitAndInstall();
    });

    ipcMain.handle("checkForUpdate", (event, data) => {
        autoUpdater.checkForUpdates();
    });
    ipcMain.handle("quit", (event, data) => {
        if (global.isUpdateAvailable){
            autoUpdater.quitAndInstall();
        }else{
            app.quit();
        }
    });
}