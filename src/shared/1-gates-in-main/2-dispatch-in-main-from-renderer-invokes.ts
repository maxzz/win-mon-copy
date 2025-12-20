import { type R2MInvoke } from "@/shared/ipc-types";
import { loadWin32FilesContent } from "../../x-electron/xternal-to-renderer/2-commands-in-main";
import { appWindow } from "../../x-electron/app/1-start-main-window/7-app-window-instance";

export async function invokeFromRendererInMain(data: R2MInvoke.AllInvokes): Promise<any> {
    switch (data.type) {
        case 'r2mi:load-files': {
            return loadWin32FilesContent(data.filenames, data.allowedExt);
        }
        case 'r2mi:load-files2': {
            return loadWin32FilesContent(data.filenames);
        }
        case 'r2mi:get-config': {
            return getConfig();
        }
        case 'r2mi:get-zoom-level': {
            const rv: R2MInvoke.InvokeResult<R2MInvoke.GetZoomLevel> = appWindow.wnd?.webContents.getZoomLevel() ?? 0;
            return rv;
        }
        default: {
            const really: never = data;
            throw new Error(`\nUnknown IPC-invoke: ${JSON.stringify(really)}\n`);
        }
    }
}

function getConfig(): { sourcePathsDebug: { path: string; inUse: boolean; }[]; sourcePathsRelease: { path: string; inUse: boolean; }[]; } {
    return {
        sourcePathsDebug: [],
        sourcePathsRelease: [],
    };
}
