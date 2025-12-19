
export namespace R2M { // Main from Renderer
    export type NotifyMessage = {
        type: 'r2m:notify';
        message: string;
    };

    export type DarkMode = {
        type: 'r2m:dark-mode';
        active: boolean;
    };

    export type SetClientOptions = {
        type: 'r2m:set-client-options';
        state: ClientOptions;
    };

    export type ClientOptions = {
        maxControls: number;
    }

    export type CancelDetection = {
        type: 'r2m:cancel-detection';
    };

    export type CopyFiles = {
        type: 'r2m:copy-files';
        mode: 'debug' | 'release';
        sourcePaths: string[];
    };

    export type SaveConfig = {
        type: 'r2m:save-config';
        config: {
            sourcePathsDebug: string[];
            sourcePathsRelease: string[];
        };
    };

    export type ZoomAction = {
        type: 'r2m:zoom-action';
        action: 'in' | 'out' | 'reset';
    };

    export type ExitApp = {
        type: 'r2m:exit-app';
    };

    export type ToMainCalls = NotifyMessage | DarkMode | SetClientOptions | CancelDetection | ZoomAction | ExitApp | CopyFiles | SaveConfig;
}

export namespace R2MParams {
    export type NotifyMessage = Omit<R2M.NotifyMessage, 'type'>;
    export type DarkMode = Omit<R2M.DarkMode, 'type'>;
    export type SetNapiOptions = Omit<R2M.SetClientOptions, 'type'>;
    export type CancelDetection = Omit<R2M.CancelDetection, 'type'>;
    export type ZoomAction = Omit<R2M.ZoomAction, 'type'>;
    export type ExitApp = Omit<R2M.ExitApp, 'type'>;
    export type CopyFiles = Omit<R2M.CopyFiles, 'type'>;
    export type SaveConfig = Omit<R2M.SaveConfig, 'type'>;
}

// Size, position, and bounds

export type PointInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    x: number;
    y: number;
};

export type SizeInt = { //All nubers must be an integer. Docs: https://electronjs.org/docs/api/structures/rectangle
    width: number;
    height: number;
};

export type RectangleInt = Prettify<PointInt & SizeInt>;
