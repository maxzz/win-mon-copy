import { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { Reorder, useDragControls, motion, AnimatePresence, type DragControls, type Variants } from "motion/react";
import { PlusIcon, Trash2 } from "lucide-react";
import { IconEyeClosed, IconEyeOn, IconRadix_DragHandleDots2 } from "@/components/ui/icons/normal/radix-icons";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";

export function PathReorderList() {
    const { userData } = useSnapshot(appSettings);
    const activeProfile = userData.activeProfileId;
    // `useSnapshot` can yield `readonly` arrays; `motion/react` expects mutable arrays.
    const paths: PathEntry[] = Array.from(userData.profiles?.[activeProfile] ?? []); // Handle potential missing profile during migration or deletion

    const onChange = useCallback(
        (v: PathEntry[]) => {
            if (appSettings.userData.profiles?.[activeProfile]) {
                appSettings.userData.profiles[activeProfile] = v;
            }
        }, [activeProfile]
    );

    useEffect(
        () => {
            const needsIds = paths.some(e => !e.id);
            if (needsIds) {
                onChange(paths.map(e => e.id ? e : { ...e, id: crypto.randomUUID() }));
            }
        }, [paths, onChange]
    );

    const toggleInUse = (id: string) => {
        onChange(paths.map(e => e.id === id ? { ...e, inUse: !e.inUse } : e));
    };

    const updatePath = (id: string, path: string) => {
        onChange(paths.map(e => e.id === id ? { ...e, path } : e));
    };

    const removePath = (id: string) => {
        onChange(paths.filter(e => e.id !== id));
    };

    const addPath = () => {
        onChange([...paths, { id: crypto.randomUUID(), path: '', inUse: true }]);
    };

    return (
        <Reorder.Group
            className="1max-h-48 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-border flex flex-col"
            axis="y"
            layoutScroll
            // style={{ overflowY: "scroll" }}
            values={paths}
            onReorder={onChange}
        >
            {paths.map(
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

            {paths.length === 0 && (
                <div
                    className="text-[10px] text-muted-foreground/50 italic py-4 text-center border border-dashed rounded-md cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={addPath}
                >
                    Click to add paths
                </div>
            )}
        </Reorder.Group>
    );
}

function PathEntryRow({ entry, onToggle, onUpdate, onRemove }: { entry: PathEntry; onToggle: () => void; onUpdate: (path: string) => void; onRemove: () => void; }) {
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            className="group relative h-7 select-none flex items-center gap-2"
            // whileDrag={{ backgroundColor: "var(--color-foreground)", zIndex: 50, }}
            dragListener={false}
            dragControls={dragControls}
            value={entry}
            initial="initial"
            animate="initial"
            whileHover="hovered"
        // variants={parentVariants}
        >
            <EyeToggle inUse={entry.inUse} onToggle={onToggle} />

            <input
                className={classNames(input0Classes, input0HoverClasses, !entry.inUse && "text-muted-foreground/40 line-through bg-muted/5")}
                value={entry.path}
                onChange={(e) => onUpdate(e.target.value)}
                data-row-path-input={entry.id}
                placeholder="Enter path..."
            />

            <RowActions onRemove={onRemove} dragControls={dragControls} variants={rowActionsVariants} />
        </Reorder.Item>
    );
}

const rowActionsVariants: Variants = {
    initial: { opacity: 0, scale: 0.75 },
    hovered: { opacity: 1, scale: 1 },
};

function RowActions({ onRemove, dragControls, variants }: { onRemove: () => void; dragControls: DragControls; variants: Variants; }) {
    return (
        <motion.div
            className="absolute top-0.5 right-4 px-0.5 flex items-center gap-1"
            variants={variants}
            // onHoverEnd={() => {
            //     console.log("hover end");
            // }}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
        >
            <Button
                className="size-6 text-muted-foreground hover:text-destructive"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                tabIndex={-1}
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
                {/* <GripVertical className="size-3.5" /> */}
                <IconRadix_DragHandleDots2 className="size-3.5" />
            </div>
        </motion.div>
    );
}

function EyeToggle({ inUse, onToggle }: { inUse: boolean; onToggle: () => void; }) {
    return (
        <Button
            className={classNames("absolute top-1.5 left-2 size-3.5 rounded-none text-muted-foreground flex items-center justify-center cursor-pointer")}
            variant="ghost"
            size="icon"
            onClick={onToggle}
            tabIndex={-1}
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
                    {inUse
                        ? <IconEyeOn className="size-full!" />
                        : <IconEyeClosed className="size-full!" />
                    }
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}

const input0Classes = "\
pl-8 pr-24 pb-0.5 \
size-full \
text-xs \
placeholder:text-muted-foreground \
disabled:cursor-not-allowed \
disabled:opacity-50 \
\
rounded-none shadow-none transition-all";

const input0HoverClasses = "\
\
group-hover:bg-red-500/50 \
group-hover:not-focus:bg-muted \
not-focus:cursor-pointer \
\
focus:bg-background \
focus:outline-1 \
focus:-outline-offset-1 \
focus:outline-foreground/50 \
\
focus:text-sky-700! \
focus-visible:outline! \
rounded! \
";

