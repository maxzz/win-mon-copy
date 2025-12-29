import { Fragment, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { clearLogsAtom, logsAtom } from "@/store/atoms-copy-files";
import { Label } from "@/components/ui/shadcn/label";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Button } from "@/components/ui/shadcn";
import { Trash2 } from "lucide-react";

export function LogsPanel({ className }: { className?: string; }) {
    const logs = useAtomValue(logsAtom);
    const clearLogs = useSetAtom(clearLogsAtom);
    
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, [logs]
    );

    return (
        <div className={classNames("p-2 border rounded-md bg-muted/50 overflow-hidden flex flex-col", className)}>
            <Label className="mb-2">
                <div className="flex items-center justify-between">
                    <span>
                        Logs ({logs.length})
                    </span>
                    <Button className="hover:text-red-700" variant="outline" size="icon-xs" title="Clear logs" onClick={() => clearLogs()}>
                        <Trash2 />
                    </Button>
                </div>
            </Label>

            <ScrollArea className="flex-1 bg-background rounded border p-2 font-mono text-xs">
                <div className="grid grid-cols-[auto_1fr] gap-1">
                    {logs.map(
                        (log, i) => (
                            <Fragment key={i}>
                                <span className="pt-px text-[0.6rem] text-right text-muted-foreground/70">
                                    {i + 1}
                                </span>
                                <div key={i}>
                                    {log}
                                </div>
                            </Fragment>
                        )
                    )}
                </div>
                <div ref={scrollRef} />
            </ScrollArea>
        </div>
    );
}
