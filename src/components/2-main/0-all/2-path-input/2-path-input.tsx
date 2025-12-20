import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";
import { cn } from "@/utils";
import { PlusIcon, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";

import { useEffect } from "react";

export function PathInput({ label, value, onChange }: { label: string, value: readonly PathEntry[], onChange: (v: PathEntry[]) => void; }) {

    useEffect(() => {
        const needsIds = value.some(e => !e.id);
        if (needsIds) {
            onChange(value.map(e => e.id ? e : { ...e, id: crypto.randomUUID() }));
        }
    }, [value, onChange]);

    const toggleInUse = (id: string) => {
        onChange(value.map(e => e.id === id ? { ...e, inUse: !e.inUse } : e));
    };

    const updatePath = (id: string, path: string) => {
        onChange(value.map(e => e.id === id ? { ...e, path } : e));
    };

    const removePath = (id: string) => {
        onChange(value.filter(e => e.id !== id));
    };

    const addPath = () => {
        onChange([...value, { id: crypto.randomUUID(), path: '', inUse: true }]);
    };

    return (
        <div className="p-2 border rounded-md bg-muted/50 overflow-hidden  flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Label className="mb-2">
                    {label}
                </Label>
                <Button className="size-6" variant="outline" size="icon" onClick={addPath}>
                    <PlusIcon className="size-4" />
                </Button>
            </div>

            <Reorder.Group
                axis="y"
                values={value as PathEntry[]}
                onReorder={onChange}
                className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border"
            >
                {value.map(
                    (entry) => (
                        <PathEntryRow
                            key={entry.id}
                            entry={entry}
                            onToggle={() => toggleInUse(entry.id)}
                            onUpdate={(path) => updatePath(entry.id, path)}
                            onRemove={() => removePath(entry.id)}
                        />
                    )
                )}

                {value.length === 0 && (
                    <div className="text-[10px] text-muted-foreground/50 italic py-4 text-center border border-dashed rounded-md cursor-pointer hover:bg-muted/30 transition-colors" onClick={addPath}>
                        Click to add paths
                    </div>
                )}
            </Reorder.Group>
        </div>
    );
}

function PathEntryRow({ entry, onToggle, onUpdate, onRemove }: { entry: PathEntry; onToggle: () => void; onUpdate: (path: string) => void; onRemove: () => void; }) {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={entry}
            dragListener={false}
            dragControls={dragControls}
            className="flex items-center gap-1 group bg-background/50 rounded-md select-none"
            whileDrag={{ 
                scale: 1.02, 
                backgroundColor: "var(--background)",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" 
            }}
        >
            <Button
                className={cn(
                    "size-7 shrink-0 transition-colors",
                    entry.inUse ? "text-primary" : "text-muted-foreground/30"
                )}
                variant="ghost"
                size="icon"
                onClick={onToggle}
                title={entry.inUse ? "Disable path" : "Enable path"}
            >
                {entry.inUse ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            </Button>

            <Input
                className={cn(
                    "h-7 py-1 px-2 text-xs transition-all select-text",
                    !entry.inUse && "text-muted-foreground/40 line-through bg-muted/20 border-transparent"
                )}
                value={entry.path}
                onChange={(e) => onUpdate(e.target.value)}
                placeholder="Enter path..."
            />

            <div className="flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={onRemove}
                    title="Remove path"
                >
                    <Trash2 className="size-3" />
                </Button>
                <div
                    className="size-7 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground touch-none select-none"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        dragControls.start(e);
                    }}
                    title="Drag to reorder"
                >
                    <GripVertical className="size-4" />
                </div>
            </div>
        </Reorder.Item>
    );
}
