import { useAtom, useAtomValue } from "jotai";
import { sourcePathsDebugAtom, sourcePathsReleaseAtom, isDebugAtom, logsAtom } from "@/store/atoms-copy-files";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Label } from "@/components/ui/shadcn/label";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { R2MCalls } from "@/shared/2-gates-in-client-as-atoms/commands-to-main/1-calls-renderer-to-main";
import { useEffect, useRef } from "react";

export function MainCopyPanel() {
    const [sourcePathsDebug, setSourcePathsDebug] = useAtom(sourcePathsDebugAtom);
    const [sourcePathsRelease, setSourcePathsRelease] = useAtom(sourcePathsReleaseAtom);
    const [isDebug, setIsDebug] = useAtom(isDebugAtom);
    const logs = useAtomValue(logsAtom);

    const handleCopy = () => {
        const paths = isDebug ? sourcePathsDebug : sourcePathsRelease;
        R2MCalls.copyFiles({ mode: isDebug ? 'debug' : 'release', sourcePaths: paths });
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [logs]);

    return (
        <div className="grid grid-rows-[auto_auto_1fr] gap-4 h-full">
            <div className="grid grid-cols-2 gap-4">
                <PathInput
                    label="Debug Source Paths (one per line)"
                    value={sourcePathsDebug}
                    onChange={setSourcePathsDebug}
                />
                <PathInput
                    label="Release Source Paths (one per line)"
                    value={sourcePathsRelease}
                    onChange={setSourcePathsRelease}
                />
            </div>

            <div className="flex items-center gap-4 border p-4 rounded-md">
                <RadioGroup
                    value={isDebug ? 'debug' : 'release'}
                    onValueChange={(v) => setIsDebug(v === 'debug')}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="debug" id="r-debug" />
                        <Label htmlFor="r-debug" className="text-xs">Debug</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="release" id="r-release" />
                        <Label htmlFor="r-release" className="text-xs">Release</Label>
                    </div>
                </RadioGroup>

                <div className="flex-1" />

                <Button onClick={handleCopy} className="text-xs">Copy Files</Button>
            </div>

            <div className="border rounded-md bg-muted/50 p-2 overflow-hidden flex flex-col">
                <Label className="mb-2 text-xs">Logs</Label>
                <ScrollArea className="flex-1 bg-background rounded border p-2 font-mono text-sm">
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                    <div ref={scrollRef} />
                </ScrollArea>
            </div>
        </div>
    );
}

function PathInput({ label, value, onChange }: { label: string, value: string[], onChange: (v: string[]) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <Label className="text-xs">{label}</Label>
            <Textarea
                value={value.join('\n')}
                onChange={(e) => onChange(e.target.value.split('\n'))}
                className="h-32"
            />
        </div>
    );
}

