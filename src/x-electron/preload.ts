import { contextBridge, ipcRenderer, IpcRendererEvent, webUtils } from "electron";
//import { statSync } from "fs";

// Custom APIs for renderer
const api: TmApi = {
    callMain: (data: any): void => {
        const channel: PreloadChannelNames = 'call-main';
        ipcRenderer.send(channel, data);
    },

    invokeMain: (data: any): any => {
        const channel: PreloadChannelNames = 'invoke-main';
        return ipcRenderer.invoke(channel, data);
    },

    setCbCallFromMain: (callback: (event: IpcRendererEvent, data: any) => void) => {
        const channel: PreloadChannelNames = 'send-to-renderer';
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, callback);
    },

    getPathForFile: async (file: File): Promise<GetFilePathResult> => { //TODO: maybe make it as a regular invoke call for array of files to avoid load fs module?
        try {
            const filePath = webUtils.getPathForFile(file);
            const res = await ipcRenderer.invoke('invoke-main', { type: 'r2mi:check-path-type', path: filePath });
            return { filePath, isDirectory: res.isDirectory, error: res.error };
        } catch (error) {
            console.error(error); // no such file case
            const msg = error instanceof Error ? error.message : `${error}`;
            return { filePath: '', isDirectory: false, error: msg };
        }
    },
};

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled,
// otherwise just add to the DOM global.

if (process.contextIsolated) { // It should be true always from now on.
    try {
        contextBridge.exposeInMainWorld('tmApi', api);
    } catch (error) {
        console.error(error);
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI;
    // @ts-ignore (define in dts)
    window.tmApi = api;
}
