import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";

export function PathInput({ label, value, onChange }: { label: string, value: readonly string[], onChange: (v: string[]) => void; }) {
    return (
        <div className="flex flex-col gap-2">
            <Label>
                {label}
            </Label>
            <Textarea
                className="h-32"
                value={value.join('\n')}
                onChange={(e) => onChange(e.target.value.split('\n'))}
            />
        </div>
    );
}

