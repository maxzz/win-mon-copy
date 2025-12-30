
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
        mode: string;
        sourcePaths: string[];
    };

    export type ZoomAction = {
        type: 'r2m:zoom-action';
        action: 'in' | 'out' | 'reset';
    };

    export type ExitApp = {
        type: 'r2m:exit-app';
    };

    export type ToggleDevTools = {
        type: 'r2m:toggle-dev-tools';
    };

    export type ToMainCalls = NotifyMessage | DarkMode | SetClientOptions | CancelDetection | ZoomAction | ExitApp | ToggleDevTools | CopyFiles;
}

export namespace R2MParams {
    export type NotifyMessage = Omit<R2M.NotifyMessage, 'type'>;            // 'r2m:notify'
    export type DarkMode = Omit<R2M.DarkMode, 'type'>;                      // 'r2m:dark-mode'
    export type SetNapiOptions = Omit<R2M.SetClientOptions, 'type'>;        // 'r2m:set-client-options'
    export type CancelDetection = Omit<R2M.CancelDetection, 'type'>;        // 'r2m:cancel-detection'
    export type CopyFiles = Omit<R2M.CopyFiles, 'type'>;                    // 'r2m:copy-files'
    export type ZoomAction = Omit<R2M.ZoomAction, 'type'>;                  // 'r2m:zoom-action'
    export type ExitApp = Omit<R2M.ExitApp, 'type'>;                        // 'r2m:exit-app'
    export type ToggleDevTools = Omit<R2M.ToggleDevTools, 'type'>;          // 'r2m:toggle-dev-tools'
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
