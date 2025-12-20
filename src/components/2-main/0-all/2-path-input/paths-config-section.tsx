import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { PathInput } from "./path-input";
import { cn } from "@/utils";

export function PathsConfigSection({ className, ...rest }: React.ComponentProps<"div">) {
    const { userData } = useSnapshot(appSettings);
    return (
        <div className={cn("grid grid-rows-2 gap-4", className)} {...rest}>
            <PathInput
                label="Debug Source Paths (one per line)"
                value={userData.sourcePathsDebug}
                onChange={(v) => appSettings.userData.sourcePathsDebug = v}
            />
            <PathInput
                label="Release Source Paths (one per line)"
                value={userData.sourcePathsRelease}
                onChange={(v) => appSettings.userData.sourcePathsRelease = v}
            />
        </div>
    );
}

