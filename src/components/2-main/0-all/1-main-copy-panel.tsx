import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { Label } from "@/components/ui/shadcn/label";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { logsAtom } from "@/store/atoms-copy-files";
import { PathsConfigSection } from "./2-path-input/1-paths-config-section";
import { classNames } from "@/utils";

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

            <div className="h-24">
                <EntryInput inUse={true} path="test" onUpdate={(path) => { }} />
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

function EntryInput({ inUse, path, onUpdate }: { inUse: boolean; path: string; onUpdate: (path: string) => void; }) {
    return (
        <input
            className={classNames(input0Classes, inputClasses, !inUse && "text-muted-foreground/40 line-through bg-muted/5")}
            value={path}
            onChange={(e) => onUpdate(e.target.value)}
            placeholder="Enter path..."
        />
    );
}

const input0Classes = "\
1px-3 \
1py-1 \
w-full \
h-24 \
text-sm \
md:text-sm \
border-input \
bg-transparent \
placeholder:text-muted-foreground \
\
1focus-visible:outline-none \
1focus-visible:ring-1 \
1focus-visible:ring-ring \
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
1border \
rounded-md \
1shadow-sm \
1transition-colors \
flex \
";

const inputClasses = "pl-8 pr-24 pb-0.5 h-full text-xs \
rounded-none shadow-none transition-all \
\
focus:outline \
focus:-outline-offset-4 \
focus:outline-sky-500 \
\
focus:text-sky-500! \
focus-visible:outline-2! \
\
";