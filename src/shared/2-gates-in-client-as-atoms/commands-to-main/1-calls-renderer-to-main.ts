import { type R2MParams } from "@/shared/ipc-types";
import { sendToMain } from "../3-to-main-apis";

export namespace R2MCalls {

    // options, notify

    export function notify(message: R2MParams.NotifyMessage): void {
        sendToMain({ type: 'r2m:notify', ...message });
    }

    export function darkMode(state: R2MParams.DarkMode): void {
        sendToMain({ type: 'r2m:dark-mode', ...state });
    }

    export function copyFiles(params: R2MParams.CopyFiles): void {
        sendToMain({ type: 'r2m:copy-files', ...params });
    }

    export function saveConfig(params: R2MParams.SaveConfig): void {
        sendToMain({ type: 'r2m:save-config', ...params });
    }
}
