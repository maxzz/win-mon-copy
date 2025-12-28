import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "motion/react";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { PathInputGrid } from "./2-path-input-grid";

export function PathsConfigSection({ className }: { className?: string }) {
    const { appUi } = useSnapshot(appSettings);
    return (
        <AnimatePresence initial={false}>
            {appUi.showFilePanels && (
                <motion.div
                    initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                    exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={className}
                >
                        <PathInputGrid />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
