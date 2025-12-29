import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/1-atoms";
import { Button } from "@/components/ui/shadcn/button";
import { IconFolderOpen } from "@/components/ui/icons/normal/radix-icons";

export function ButtonShowProfileItems() {
    const { showFilePanels } = useSnapshot(appSettings.appUi);
    return (
        <Button
            className={classNames("size-6 focus-visible:ring-0 hover:bg-transparent transition-colors", showFilePanels ? "text-foreground" : "text-muted-foreground/50")}
            variant="ghost"
            size="icon"
            title={showFilePanels ? "Hide file panels" : "Show file panels"}
            type="button"
            onClick={() => appSettings.appUi.showFilePanels = !showFilePanels}
        >
            <IconFolderOpen className={classNames("size-4", showFilePanels ? "fill-sky-500/20" : "text-muted-foreground/50")} />
        </Button>
    );
}
