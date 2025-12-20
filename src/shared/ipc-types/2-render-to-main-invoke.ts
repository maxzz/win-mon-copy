
export namespace R2MInvoke { // Main from Renderer invoke and get result

    // load files

    export type DoLoadfiles = {
        type: 'r2mi:load-files';
        filenames: string[];
        allowedExt?: string[];
    };

    type DoLoadfiles2 = { type: 'r2mi:load-files2'; filenames: string[]; };

    export type GetConfig = {
        type: 'r2mi:get-config';
    };

    export type GetZoomLevel = {
        type: 'r2mi:get-zoom-level';
    };

    export type AllInvokes =
        | DoLoadfiles
        | DoLoadfiles2
        | GetConfig
        | GetZoomLevel
        ;

    export type InvokeResult<T extends R2MInvoke.AllInvokes> =
        T extends DoLoadfiles                //'r2mi:load-files'
        // T['type'] extends 'r2mi:load-files'               //'r2mi:load-files' // This is OK but not for now
        ? {
            filesCnt: FileContent[];
            emptyFolder: string;
        }

        : T extends GetConfig
        ? {
            sourcePathsDebug: { path: string; inUse: boolean; }[];
            sourcePathsRelease: { path: string; inUse: boolean; }[];
        }

        : T extends GetZoomLevel             //'r2mi:get-zoom-level'
        ? number

        : never;

    export type FileContent = {
        name: string;                   // file name wo/ path
        fullPath: string;               // file full path and filename
        cnt: string;                    // file content or error message
        failed?: boolean;               // if failed the cnt member has error text
        notOur?: boolean;               // load of file content was blocked by allowedExt list.

        entry?: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
        file?: File;                    // File object from async entry.file() call
    };

    export const allowedExt = ['dpm', 'dpn'];

} //namespace R2MInvoke

export namespace R2MInvokeParams {
    export type DoLoadfiles = Omit<R2MInvoke.DoLoadfiles, 'type'>;
    export type GetConfig = Omit<R2MInvoke.GetConfig, 'type'>;
}
