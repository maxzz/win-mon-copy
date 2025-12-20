import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms";
import { Button } from "@/components/ui/shadcn/button";
// import { SymbolFolder } from "../ui/icons/symbols";
import { cn } from "@/utils";
import { FolderOpen } from "lucide-react";

export function ButtonToggleFilePanels() {
    const { appUi } = useSnapshot(appSettings);

    return (
        <Button
            className={cn(
                "size-6 focus-visible:ring-0 hover:bg-transparent transition-colors",
                appUi.showFilePanels ? "text-primary" : "text-muted-foreground/50",
            )}
            variant="ghost"
            size="icon"
            onClick={() => appSettings.appUi.showFilePanels = !appUi.showFilePanels}
            title={appUi.showFilePanels ? "Hide file panels" : "Show file panels"}
            type="button"
        >
            {/* <SymbolFolder className="size-4" /> */}
            <FolderOpen className={cn("size-4", appUi.showFilePanels ? "fill-sky-500/20" : "text-muted-foreground/50")} />
        </Button>
    );
}
