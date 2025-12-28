import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { Label } from "@/components/ui/shadcn/label";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { logsAtom } from "@/store/atoms-copy-files";
import { PathsConfigSection } from "./2-path-input/1-paths-config-section";

export function MainCopyPanel() {
    const logs = useAtomValue(logsAtom);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, [logs]
    );

    return (
        <div className="grid grid-rows-[auto_1fr] gap-4 h-full">

            <PathsConfigSection />

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
