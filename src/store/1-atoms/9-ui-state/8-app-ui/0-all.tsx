import { ThemeMode } from "@/utils";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";

export type AppUISettings = {
    theme: ThemeMode;
    uiAdvanced: UiAdvancedState;
    accordionsOpened: Record<string, boolean>;
    showFilePanels: boolean;
};

export type PathEntry = {
    id: string;
    inUse: boolean;
    path: string;
};

export type UserData = {
    sourcePathProfiles: Record<string, PathEntry[]>;
    activeProfileId: string;
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    uiAdvanced: defaultUiAdvancedState,
    accordionsOpened: {},
    showFilePanels: true,
};

export const defaultUserData: UserData = {
    sourcePathProfiles: {
        'Debug': [],
        'Release': [],
    },
    activeProfileId: 'Debug',
};
