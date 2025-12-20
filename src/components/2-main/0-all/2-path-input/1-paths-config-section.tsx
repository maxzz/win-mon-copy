import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { PathInput } from "./2-path-input";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "motion/react";

export function PathsConfigSection({ className, ...rest }: React.ComponentProps<"div">) {
    const { userData, appUi } = useSnapshot(appSettings);

    return (
        <AnimatePresence initial={false}>
            {appUi.showFilePanels && (
                <motion.div
                    initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}

