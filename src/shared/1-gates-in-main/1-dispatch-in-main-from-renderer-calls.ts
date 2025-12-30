import { Notification, app } from "electron";
import { type R2M } from "@/shared/ipc-types";
import { appWindow } from "../../x-electron/app/1-start-main-window/7-app-window-instance";
import { copyFilesLogic } from "../../x-electron/xternal-to-renderer/2-commands-in-main";
//import { electronState } from "../../x-electron/app/2-electron-globals"; This is not needed so far or anymore.

export async function callFromRendererInMain(data: R2M.ToMainCalls): Promise<void> {
    switch (data.type) {
        case 'r2m:notify': {
            new Notification({ title: 'My Noti', body: data.message }).show();
            break;
        }
        case 'r2m:dark-mode': {
            data.active;
            break;
        }
        case 'r2m:set-client-options': {
            // electronState.maxControls = data.state.maxControls;
            break;
        }
        case 'r2m:cancel-detection': {323
            // electronState.cancelDetection = true;
            break;
        }
        case 'r2m:copy-files': {
            copyFilesLogic(data.mode, data.sourcePaths);
            break;
        }
        case 'r2m:zoom-action': {
            const w = appWindow.wnd;
            if (w) {
                const current = w.webContents.getZoomLevel();
                let next = current;
                if (data.action === 'in') next += 0.5;
                else if (data.action === 'out') next -= 0.5;
                else if (data.action === 'reset') next = 0;
                
                if (next !== current) {
                    w.webContents.setZoomLevel(next);
                    w.webContents.send('send-to-renderer', { type: 'm2r:zoom-changed', level: next });
                }
            }
            break;
        }
        case 'r2m:exit-app': {
            app.quit();
            break;
        }
        case 'r2m:toggle-dev-tools': {
            const w = appWindow.wnd;
            if (w) {
                w.webContents.toggleDevTools();
            }
            break;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-call: ${JSON.stringify(really)}\n`);
        }
    }
}
