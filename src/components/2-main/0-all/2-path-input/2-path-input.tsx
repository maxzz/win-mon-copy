import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { PathEntry } from "@/store/1-atoms/9-ui-state/8-app-ui/0-all";

export function PathInput({ label, value, onChange }: { label: string, value: readonly PathEntry[], onChange: (v: PathEntry[]) => void; }) {
    const textValue = value.map(v => v.path).join('\n');

    const handleTextChange = (newText: string) => {
        const newPaths = newText.split('\n').map(s => s.trim());//.filter(Boolean);
        const nextValue = newPaths.map(p => {
            const existing = value.find(v => v.path === p);
            return {
                path: p,
                inUse: existing ? existing.inUse : true
            };
        });
        onChange(nextValue);
    };

    return (
        <div className="flex flex-col gap-2">
            <Label>
                {label}
            </Label>
            <Textarea
                className="h-32"
                value={textValue}
                onChange={(e) => handleTextChange(e.target.value)}
            />
        </div>
    );
}

