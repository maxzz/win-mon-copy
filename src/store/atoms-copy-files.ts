import { atom } from 'jotai';

export const logsAtom = atom<string[]>([]);


export const addLogAtom = atom(
    null,
    (get, set, text: string) => {
        set(logsAtom, (prev) => [...prev, text]);
    }
);

