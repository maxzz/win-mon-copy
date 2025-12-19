import { atom } from 'jotai';

export const sourcePathsDebugAtom = atom<string[]>([]);
export const sourcePathsReleaseAtom = atom<string[]>([]);
export const isDebugAtom = atom(true);
export const logsAtom = atom<string[]>([]);

// Derived atom for current source paths
export const currentSourcePathsAtom = atom((get) => {
    return get(isDebugAtom) ? get(sourcePathsDebugAtom) : get(sourcePathsReleaseAtom);
});

export const addLogAtom = atom(
    null,
    (get, set, text: string) => {
        set(logsAtom, (prev) => [...prev, text]);
    }
);

