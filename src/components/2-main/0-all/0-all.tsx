import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { LogsPanel } from "../1-panel-logs/1-logs-panel";
import { PathInputGrid } from "../2-panel-profile/2-path-input-grid";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("flex flex-col overflow-hidden", className)} {...rest}>
            <LogsPanel className="flex-1" />
            <PathsConfigSection className="" />
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
