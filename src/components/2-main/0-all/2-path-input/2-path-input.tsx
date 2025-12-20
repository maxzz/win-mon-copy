import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";
import { SymbolCheckbox, SymbolCheckboxEmpty, SymbolCross } from "@/components/ui/icons/symbols";
import { cn } from "@/utils";

export function PathInput({ label, value, onChange }: { label: string, value: readonly PathEntry[], onChange: (v: PathEntry[]) => void; }) {
    
    const toggleInUse = (index: number) => {
        const nextValue = [...value];
        nextValue[index] = { ...nextValue[index], inUse: !nextValue[index].inUse };
        onChange(nextValue);
    };

    const updatePath = (index: number, path: string) => {
        const nextValue = [...value];
        nextValue[index] = { ...nextValue[index], path };
        onChange(nextValue);
    };

    const removePath = (index: number) => {
        const nextValue = value.filter((_, i) => i !== index);
        onChange(nextValue);
    };

    const addPath = () => {
        onChange([...value, { path: '', inUse: true }]);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">
                    {label}
                </Label>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-[10px] uppercase tracking-wider font-bold opacity-50 hover:opacity-100" 
                    onClick={addPath}
                >
                    + Add Path
                </Button>
            </div>
            
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border">
                {value.map((entry, idx) => (
                    <div key={idx} className="flex items-center gap-1 group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "size-7 shrink-0 transition-colors",
                                entry.inUse ? "text-primary" : "text-muted-foreground/30"
                            )}
                            onClick={() => toggleInUse(idx)}
                            title={entry.inUse ? "Disable path" : "Enable path"}
                        >
                            {entry.inUse ? <SymbolCheckbox className="size-4" /> : <SymbolCheckboxEmpty className="size-4" />}
                        </Button>
                        
                        <Input
                            className={cn(
                                "h-7 py-1 px-2 text-xs transition-all",
                                !entry.inUse && "text-muted-foreground/40 line-through bg-muted/20 border-transparent"
                            )}
                            value={entry.path}
                            onChange={(e) => updatePath(idx, e.target.value)}
                            placeholder="Enter path..."
                        />
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            onClick={() => removePath(idx)}
                            title="Remove path"
                        >
                            <SymbolCross className="size-3" />
                        </Button>
                    </div>
                ))}
                
                {value.length === 0 && (
                    <div 
                        className="text-[10px] text-muted-foreground/50 italic py-4 text-center border border-dashed rounded-md cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={addPath}
                    >
                        Click to add paths
                    </div>
                )}
            </div>
        </div>
    );
}

