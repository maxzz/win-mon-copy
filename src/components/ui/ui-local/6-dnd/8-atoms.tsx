import { atom } from "jotai";
import { notice } from "../7-toaster";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";

export type DoSetFilesFrom_Dnd_Atom = typeof doSetFilesFrom_Dnd_Atom;

export const doSetFilesFrom_Dnd_Atom = atom(                    // used by DropItDoc only
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        const files: File[] = [];

        if (dataTransfer.items) {
            for (let i = 0; i < dataTransfer.items.length; i++) {
                const item = dataTransfer.items[i];
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file) files.push(file);
                }
            }
        } else {
            for (let i = 0; i < dataTransfer.files.length; i++) {
                const file = dataTransfer.files[i];
                files.push(file);
            }
        }

        if (!files.length) {
            return;
        }

        const filePaths = await Promise.all(files.map(async file => {
            const res = await tmApi.getPathForFile(file);
            console.log('file path', res);
            return res.filePath;
        }));

        const activeElement = document.activeElement;
        const rowPathInputId = activeElement instanceof HTMLInputElement && activeElement.dataset['rowPathInput'];

        if (rowPathInputId) {
            const items = appSettings.userData.profiles?.[appSettings.userData.activeProfileId] || [];

            if (filePaths.length === 1) {
                const item = items.find(i => i.id === rowPathInputId);
                if (item) {
                    item.path = filePaths[0];

                }
            }
        } else {
            notice.info('dropped files' + filePaths.join(',\n'));
            console.log('dropped files', filePaths.join(',\n'));
        }
    }
); 
