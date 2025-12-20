import { Label } from "@/components/ui/shadcn/label";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";
import { cn } from "@/utils";
import { PlusIcon, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";
import { Button } from "@/components/ui/shadcn/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/shadcn/input-group";

import { useEffect } from "react";
import { Input } from "@/components/ui/shadcn/input";

export function PathInput({ label, value, onChange }: { label: string, value: readonly PathEntry[], onChange: (v: PathEntry[]) => void; }) {

    useEffect(
        () => {
            const needsIds = value.some(e => !e.id);
            if (needsIds) {
                onChange(value.map(e => e.id ? e : { ...e, id: crypto.randomUUID() }));
            }
        }, [value, onChange]
    );

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
                <Label>
                    {label}
                </Label>
                <Button className="size-6" variant="outline" size="icon" onClick={addPath}>
                    <PlusIcon className="size-4" />
                </Button>
            </div>

            <Reorder.Group
                className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-border flex flex-col"
                axis="y"
                layoutScroll
                style={{ overflowY: "scroll" }}
                values={value as PathEntry[]}
                onReorder={onChange}
            >
                {value.map(
                    (entry) => (
                        <PathEntryRow
                            entry={entry}
                            onToggle={() => toggleInUse(entry.id)}
                            onUpdate={(path) => updatePath(entry.id, path)}
                            onRemove={() => removePath(entry.id)}
                            key={entry.id}
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
            className="group relative select-none"
            value={entry}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{ scale: 1, zIndex: 50, }}
        >
            <Button
                className={cn("absolute top-0 left-0 size-1 transition-colors", entry.inUse ? "text-primary" : "text-muted-foreground/30")}
                variant="ghost"
                size="icon"
                onClick={onToggle}
                title={entry.inUse ? "Disable path" : "Enable path"}
            >
                {entry.inUse ? <Eye className="size-1" /> : <EyeOff className="size-1" />}
            </Button>

            <Input
                className={cn("px-8 py-1 h-full text-xs transition-all select-text", !entry.inUse && "text-muted-foreground/40 line-through")}
                value={entry.path}
                onChange={(e) => onUpdate(e.target.value)}
                placeholder="Enter path..."
            />

            <div className="absolute top-0 right-4 flex items-center gap-1 px-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    className="size-6 text-muted-foreground hover:text-destructive"
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    title="Remove path"
                >
                    <Trash2 className="size-3" />
                </Button>

                <div
                    className="size-6 text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing touch-none select-none cursor-grab flex items-center justify-center"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        dragControls.start(e);
                    }}
                    title="Drag to reorder"
                >
                    <GripVertical className="size-3.5" />
                </div>
            </div>
        </Reorder.Item>
    );
}
