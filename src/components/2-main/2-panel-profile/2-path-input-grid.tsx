import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/1-atoms";
import { Label } from "@radix-ui/react-label";
import { PathReorderList } from "./3-path-reorder-list";

export function PathInputGrid({ className }: { className?: string; }) {
    const { activeProfileId } = useSnapshot(appSettings.userData);
    return (
        <div className={classNames("p-2 border rounded-md bg-muted/50 overflow-hidden flex flex-col gap-2", className)}>
            <div className="flex items-center justify-between">
                <div className="text-[0.65rem] text-muted-foreground">
                    {activeProfileId ? `Profile: ${activeProfileId}` : "Profile: (none)"}
                </div>

                {/* <Button className="size-6" variant="outline" size="icon" onClick={addPath} disabled={!activeProfile}>
                    <PlusIcon className="size-4" />
                </Button> */}
            </div>

            <PathReorderList />
        </div>
    );
}
