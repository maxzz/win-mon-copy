import { Fragment, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { doClearLogsAtom, logsAtom } from "@/store/atoms-copy-files";

export function LogsPanel({ className }: { className?: string; }) {
    const logs = useAtomValue(logsAtom);
    const clearLogs = useSetAtom(doClearLogsAtom);

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, [logs]
    );

    return (
        <div className={classNames("p-2 border rounded-md bg-muted/50 overflow-hidden flex flex-col", className)}>
            <Label className="mb-2">
                <div className="flex items-center justify-between">
                    <span>
                        Logs ({logs.length})
                    </span>
                    <Button className="not-disabled:hover:text-red-700" variant="outline" size="icon-xs" title="Clear logs" disabled={logs.length === 0} onClick={clearLogs}>
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
