import { ThemeMode } from "@/utils";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";

// App UI Settings

export type AppUISettings = {
    theme: ThemeMode;
    uiAdvanced: UiAdvancedState;
    accordionsOpened: Record<string, boolean>;
    showFilePanels: boolean;
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    uiAdvanced: defaultUiAdvancedState,
    accordionsOpened: {},
    showFilePanels: true,
};

// User Data

export type PathEntry = {
    id: string;
    inUse: boolean;
    path: string;
};

export type UserData = {
    profiles: Record<string, PathEntry[]>;
    activeProfileId: string;
};

export const defaultUserData: UserData = {
    profiles: {
        'Debug': [],
        'Release': [],
    },
    activeProfileId: 'Debug',
};
