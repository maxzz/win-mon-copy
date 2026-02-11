import { atom } from 'jotai';
import { R2MCalls } from '@/shared/2-gates-in-client-as-atoms/commands-to-main/1-calls-renderer-to-main';
import { appSettings } from './1-atoms/9-ui-state/0-local-storage-app/1-local-storage';

// UI State Atoms for Profile Dialogs
export const isOpenDlgAddProfileAtom = atom(false);
export const isOpenDlgDeleteProfileAtom = atom(false);
export const isOpenDlgAboutAtom = atom(false);

// Profile Actions

export const doAddProfileAtom = atom(
    null,
    (get, set, newProfileName: string): boolean => {
        const { userData } = appSettings;

        if (newProfileName && !userData.profiles[newProfileName]) {
            appSettings.userData.profiles[newProfileName] = [];
            appSettings.userData.activeProfileId = newProfileName;
            return true;
        }
        return false;
    }
);

export const doDeleteProfileAtom = atom(
    null,
    (get, set): boolean => {
        const { userData } = appSettings;
        const activeProfile = userData.activeProfileId;
        if (!activeProfile) {
            return false;
        }

        const profilesKeys = Object.keys(userData.profiles);

        if (profilesKeys.length) {
            const newProfiles = profilesKeys.filter(p => p !== activeProfile);
            delete appSettings.userData.profiles[activeProfile];
            appSettings.userData.activeProfileId = newProfiles[0];
            return true;
        }
        return false;
    }
);

// Actions

export const doCopyFilesAtom = atom(
    null,
    (get, set) => {
        const { userData } = appSettings;
        const activeProfile = userData.activeProfileId;

        const pathEntries = userData.profiles[activeProfile];
        if (!pathEntries || pathEntries.length === 0) {
            set(doAddLogStringAtom, "There are no paths to copy.");
            return;
        }

        const sourcePaths = pathEntries.filter(p => p.inUse).map(p => p.path);
        R2MCalls.copyFiles({ mode: activeProfile, sourcePaths });
    }
);

// Logs

export const logsAtom = atom<string[]>([]);

export const doAddLogStringAtom = atom(
    null,
    (get, set, text: string) => {
        set(logsAtom, (prev) => [...prev, text]);
    }
);

export const doClearLogsAtom = atom(
    null,
    (get, set) => {
        set(logsAtom, []);
    }
);
