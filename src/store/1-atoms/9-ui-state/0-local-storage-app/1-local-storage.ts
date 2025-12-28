import { proxy, subscribe } from 'valtio';
import { mergeDefaultAndLoaded, themeApplyMode } from '@/utils';
//import { sendNapiOptions } from '@/shared/2-gates-in-client-as-atoms';
import { type AppUISettings, defaultAppUISettings, type UserData, defaultUserData } from '../8-app-ui';

const STORAGE_UI_KEY = 'win-mon-copy:ui';
const STORAGE_UI_VER = 'v1';

type AppUi = {
    appUi: AppUISettings;           // App UI settings: theme, divider, etc.
    userData: UserData;             // User data: source paths, etc.
};

const initialAppUi: AppUi = {
    appUi: defaultAppUISettings,
    userData: defaultUserData,
};

export const appSettings = proxy<AppUi>(loadUiInitialState());

// Apply theme changes

themeApplyMode(appSettings.appUi.theme);

subscribe(appSettings.appUi, () => {
    themeApplyMode(appSettings.appUi.theme);
});

// Local storage

function loadUiInitialState(): AppUi {
    let storageUi: any;

    let storageUiStr = localStorage.getItem(STORAGE_UI_KEY);
    if (storageUiStr) {
        try {
            storageUi = JSON.parse(storageUiStr)?.[STORAGE_UI_VER];
        } catch (error) {
            console.error('storageUi bad format');
        }
    }

    const state = mergeDefaultAndLoaded({ defaults: initialAppUi, loaded: storageUi });

    // Migration v0 -> v1 (sourcePathsDebug/Release -> sourcePathProfiles)
    const userDataAny = state.userData as any;
    if (Array.isArray(userDataAny.sourcePathsDebug) || Array.isArray(userDataAny.sourcePathsRelease)) {
        if (!state.userData.sourcePathProfiles) {
            state.userData.sourcePathProfiles = { ...defaultUserData.sourcePathProfiles };
        }
        
        if (Array.isArray(userDataAny.sourcePathsDebug) && userDataAny.sourcePathsDebug.length > 0) {
            state.userData.sourcePathProfiles['Debug'] = [...userDataAny.sourcePathsDebug];
        }
        if (Array.isArray(userDataAny.sourcePathsRelease) && userDataAny.sourcePathsRelease.length > 0) {
            state.userData.sourcePathProfiles['Release'] = [...userDataAny.sourcePathsRelease];
        }

        if (typeof userDataAny.isDebug === 'boolean') {
            state.userData.activeProfileId = userDataAny.isDebug ? 'Debug' : 'Release';
        }
        
        // Cleanup old keys
        delete userDataAny.sourcePathsDebug;
        delete userDataAny.sourcePathsRelease;
        delete userDataAny.isDebug;
    }

    return state;
}

subscribe(appSettings, () => {
    //sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appSettings }));
});
