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
    normalizeLoadedState(state);
    return state;
}

function normalizeLoadedState(state: AppUi) {
    // Allow the user to delete the last profile, meaning `profiles` can be empty.
    // Still ensure the state shape is consistent and avoids `undefined` values.
    const profiles = state.userData?.profiles ?? {};
    const keys = Object.keys(profiles);

    if (!keys.length) {
        state.userData.profiles = {};
        state.userData.activeProfileId = "";
        return;
    }

    const active = state.userData.activeProfileId;
    if (!active || !(active in profiles)) {
        state.userData.activeProfileId = keys[0];
    }
}

subscribe(appSettings, () => {
    //sendNapiOptions();
    localStorage.setItem(STORAGE_UI_KEY, JSON.stringify({ [STORAGE_UI_VER]: appSettings }));
});
