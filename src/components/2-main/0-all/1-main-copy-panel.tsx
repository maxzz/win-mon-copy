import { PathsConfigSection } from "./2-path-input/1-paths-config-section";
import { LogsPanel } from "./3-logs-panel";
import { classNames } from "@/utils";

export function MainCopyPanel() {
    return (
        <div className="grid grid-rows-[auto_1fr] gap-4 h-full">

            <PathsConfigSection className="py-4" />

            {/* <div className="h-24">
                <EntryInput inUse={true} path="test" onUpdate={(path) => { }} />
            </div> */}

            <LogsPanel />
        </div>
    );
}
