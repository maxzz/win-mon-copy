import { useEffect } from "react";
import { getZoomLevel } from "./3-to-main-apis";
import { useSetAtom } from "jotai";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";

// Initial state exchange from renderer to main

export function OnAppMount() {
    const setZoom = useSetAtom(zoomLevelAtom);
    useEffect(
        () => {
            getZoomLevel().then(setZoom);
        }, [setZoom]
    );
    return null;
}
