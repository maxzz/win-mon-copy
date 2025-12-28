import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { PathInput } from "./2-path-input";
import { cn } from "@/utils";
import { AnimatePresence, motion } from "motion/react";

export function PathsConfigSection({ className, ...rest }: React.ComponentProps<"div">) {
    const { userData, appUi } = useSnapshot(appSettings);
    const activeProfile = userData.activeProfileId;
    const paths = userData.sourcePathProfiles?.[activeProfile] || []; // Handle potential missing profile during migration or deletion

    return (
        <AnimatePresence initial={false}>
            {appUi.showFilePanels && (
                <motion.div
                    initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <div className={cn("grid gap-4", className)} {...rest}>
                        <PathInput
                            label={`${activeProfile} Source Paths (one per line)`}
                            value={paths}
                            onChange={(v) => {
                                if (appSettings.userData.sourcePathProfiles && appSettings.userData.sourcePathProfiles[activeProfile]) {
                                    appSettings.userData.sourcePathProfiles[activeProfile] = v;
                                }
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
