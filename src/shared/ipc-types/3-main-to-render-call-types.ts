import { type R2MInvoke } from "./2-render-to-main-invoke";

export namespace M2R { // Main to Renderer

    // menu commands

    export type DarkMode = {
        type: 'm2r:dark-mode';
        active: boolean;
    };

    export type ReloadFiles = {
        type: 'm2r:reload-files';
    };

    export type OpenedFiles = {
        type: 'm2r:opened-files';
        filesCnt: R2MInvoke.FileContent[];
    };

    export type LogUpdate = {
        type: 'm2r:log-update';
        text: string;
    };

    export type ZoomChanged = {
        type: 'm2r:zoom-changed';
        level: number;
    };

    export type RendererCalls = DarkMode | ReloadFiles | OpenedFiles | LogUpdate | ZoomChanged;
}
