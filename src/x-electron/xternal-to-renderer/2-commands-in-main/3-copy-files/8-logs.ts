import { appWindow } from "../../../app/1-start-main-window/7-app-window-instance";

export function log(text: string) {
    if (appWindow.wnd) {
        appWindow.wnd.webContents.send('send-to-renderer', { type: 'm2r:log-update', text });
    }
}
