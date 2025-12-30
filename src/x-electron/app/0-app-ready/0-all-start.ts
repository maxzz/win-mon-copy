import { app } from 'electron';
import { connect_ListenersForCallFromRenderer, createAppWindow } from '../1-start-main-window';
import { iniFileOptions } from '../1-start-main-window/8-ini-file-options';
import { setAppListeners } from '../1-start-main-window/3-2-listeners-of-app';
import { createTray } from '../1-start-main-window/4-tray';
import { createAppMenu } from '../1-start-main-window/5-app-menu';
import { appWindow } from '../1-start-main-window/7-app-window-instance';

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    console.log('no.lock.second-instance.running');
    app.quit();
} else {
    ContinueRunApp();
}

function ContinueRunApp() {
    if (!app.isPackaged) {
        app.commandLine.appendSwitch('remote-debugging-port', '9222');
    }

    app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (appWindow.wnd) {
            if (appWindow.wnd.isMinimized()) {
                appWindow.wnd.restore();
            }
            appWindow.wnd.focus();
        }
    });

    app.whenReady().then(() => {
        connect_ListenersForCallFromRenderer();

        createAppMenu(); // Set up application menu with zoom shortcuts

        iniFileOptions.load();
        createAppWindow();

        setAppListeners();

        createTray();
    });
}
