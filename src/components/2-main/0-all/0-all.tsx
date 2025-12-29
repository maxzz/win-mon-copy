import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { LogsPanel } from "./2-logs-panel";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { AnimatePresence, motion } from "motion/react";
import { PathInputGrid } from "./1-path-input-grid";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("px-4 flex flex-col overflow-hidden", className)} {...rest}>
            <PathsConfigSection className="pt-4" />
            <LogsPanel className="flex-1 my-4" />
        </div>
    );
}

function PathsConfigSection({ className }: { className?: string; }) {
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
