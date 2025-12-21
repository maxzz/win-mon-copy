import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { SelectTm } from "@/components/ui/ui-local/4-select-tm";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { R2MCalls } from "@/shared/2-gates-in-client-as-atoms/commands-to-main/1-calls-renderer-to-main";
import { logsAtom } from "@/store/atoms-copy-files";
import { PathsConfigSection } from "./2-path-input/1-paths-config-section";

export function MainCopyPanel() {
    const { userData } = useSnapshot(appSettings);
    const logs = useAtomValue(logsAtom);

    const handleCopy = () => {
        const pathEntries = userData.isDebug ? userData.sourcePathsDebug : userData.sourcePathsRelease;
        const sourcePaths = pathEntries.filter(p => p.inUse).map(p => p.path);
        R2MCalls.copyFiles({ mode: userData.isDebug ? 'debug' : 'release', sourcePaths });
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, [logs]
    );

    return (
        <div className="grid grid-rows-[auto_auto_1fr] gap-4 h-full">

            <PathsConfigSection />

            <div className="flex items-center justify-between gap-4 border p-4 rounded-md">
                <SelectTm
                    triggerClasses="w-32"
                    items={["Debug", "Release"]}
                    value={userData.isDebug ? "Debug" : "Release"}
                    onValueChange={(v) => appSettings.userData.isDebug = (v === "Debug")}
                />

                <Button size="sm" onClick={handleCopy}>Copy Files</Button>
            </div>

            <div className="p-2 border rounded-md bg-muted/50 overflow-hidden flex flex-col">
                <Label className="mb-2">
                    Logs
                </Label>
                <ScrollArea className="flex-1 bg-background rounded border p-2 font-mono text-sm">
                    {logs.map(
                        (log, i) => (
                            <div key={i}>{log}</div>
                        )
                    )}
                    <div ref={scrollRef} />
                </ScrollArea>
            </div>
        </div>
    );
}
