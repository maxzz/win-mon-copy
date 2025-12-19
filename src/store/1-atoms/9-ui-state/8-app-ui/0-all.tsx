import { ThemeMode } from "@/utils";
import { defaultUiAdvancedState, UiAdvancedState } from "./4-advanced";

export type AppUISettings = {
    theme: ThemeMode;
    uiAdvanced: UiAdvancedState;
    accordionsOpened: Record<string, boolean>;
    sawTab: "raw" | "info";
};

export type UserData = {
    sourcePathsDebug: string[];
    sourcePathsRelease: string[];
    isDebug: boolean;
};

export const defaultAppUISettings: AppUISettings = {
    theme: 'light',
    uiAdvanced: defaultUiAdvancedState,
    accordionsOpened: {},
    sawTab: 'raw',
};

export const defaultUserData: UserData = {
    sourcePathsDebug: [],
    sourcePathsRelease: [],
    isDebug: true,
};
