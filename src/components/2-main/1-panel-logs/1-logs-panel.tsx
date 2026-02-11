import { Fragment, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Trash2 } from "lucide-react";
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
        <div className={classNames("1px-2 bg-muted/50 flex flex-col overflow-hidden", className)}>

            <div className="px-2 py-1 border-b flex items-center justify-between">
                <span className="text-[0.65rem] text-muted-foreground">
                    Logs:{' '}
                    <span className="font-mono text-muted-foreground/70">{logs.length}</span>
                </span>
                <Button className="group size-5 not-disabled:hover:bg-red-500 not-disabled:hover:text-white transition-colors" variant="ghost" size="icon-xs" title="Clear logs" disabled={logs.length === 0} onClick={clearLogs}>
                    <Trash2 className="size-3.5 stroke-1 group-hover:stroke-2!" />
                </Button>
            </div>

            <ScrollArea className="flex-1 pr-3 py-1 text-xs font-mono bg-background">
                <div className="grid grid-cols-[minmax(1.2rem,auto)_1fr] gap-x-1 gap-y-0.75">
                    {logs.map(
                        (log, idx) => (
                            <Fragment key={idx}>
                                <span className="pt-0.5 text-[0.6rem] text-right text-muted-foreground/70">
                                    {idx + 1}
                                </span>
                                <div>
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
