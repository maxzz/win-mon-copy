import { useEffect } from "react";
import { cn } from "@/utils";
import { Reorder, useDragControls, motion, AnimatePresence, type DragControls } from "motion/react";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { PlusIcon, GripVertical, Trash2 } from "lucide-react";
import { IconEyeClosed, IconEyeOn } from "@/components/ui/icons/normal/radix-icons";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";

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
            className="group relative h-7 select-none"
            value={entry}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{ scale: 1, zIndex: 50, }}
            whileHover="hover"
        >
            <VisibilityToggle inUse={entry.inUse} onToggle={onToggle} />

            <Input
                className={cn("pl-8 pr-24 pb-0.5 h-full text-xs rounded-none shadow-none", !entry.inUse && "text-muted-foreground/40 line-through")}
                value={entry.path}
                onChange={(e) => onUpdate(e.target.value)}
                placeholder="Enter path..."
            />

            <RowActions onRemove={onRemove} dragControls={dragControls} />
        </Reorder.Item>
    );
}

function VisibilityToggle({ inUse, onToggle }: { inUse: boolean; onToggle: () => void; }) {
    return (
        <Button
            className={cn("absolute top-1.5 left-2 size-3.5 text-muted-foreground flex items-center justify-center cursor-pointer")}
            variant="ghost"
            size="icon"
            onClick={onToggle}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={inUse ? "on" : "off"}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="size-full flex items-center justify-center"
                >
                    {inUse ? <IconEyeOn className="size-full!" /> : <IconEyeClosed className="size-full!" />}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}

function RowActions({ onRemove, dragControls }: { onRemove: () => void; dragControls: DragControls }) {
    return (
        <motion.div
            className="absolute top-0.5 right-4 flex items-center gap-1 px-0.5 opacity-0 group-hover:opacity-100 transition-opacity 1pointer-events-none"
            //whileHover="hover"
            initial="initial"
            variants={{
                initial: { opacity: 0, scale: 0.5 },
                hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.2, delay: 0.25, ease: "easeOut" }}
        >
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
        </motion.div>
    );
}
