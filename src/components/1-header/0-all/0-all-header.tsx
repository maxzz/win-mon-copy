import { type ComponentPropsWithoutRef } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { IconMicroscope } from "../../ui/icons/normal";
import { PopoverSettings } from "../../4-dialogs/7-settings-dialog";
import { Button } from "../../ui/shadcn";
import { TopMenu } from "../4-top-menu";
import { doAddLogStringAtom, doCopyFilesAtom } from "@/store/atoms-copy-files";
import { ButtonShowProfileItems } from "../1-btn-show-profile-items";
import { ProfileSelector } from "../2-profile-selector";
import { ButtonQuickToggleThemeMode } from "../3-btn-theme-toggle";

export function Section1Header({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const copyFiles = useSetAtom(doCopyFilesAtom);
    const addLog = useSetAtom(doAddLogStringAtom);

    function addTestLogLine() {
        const len = 10 + Math.floor(Math.random() * 5000);
        const payload = "x".repeat(len);
        addLog(`TEST(len=${len}): ${payload}`);
    }

    return (
        <div className={classNames("pl-4 pr-2 py-2 border-b border-border shadow-xs", className)} {...rest}>

            <div className="h-6.5 flex items-center justify-between">
                <div className="text-foreground/50 flex items-center gap-1">
                    <IconMicroscope className="shrink-0 size-4 stroke-6!" />
                    <span className="justify-self-start text-xs">
                        Files copy monitor
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <ButtonShowProfileItems />
                    <ProfileSelector />

                    <Button size="sm" onClick={addTestLogLine} className="h-7 text-xs ml-2" variant="outline" title="Add test log line with random length">
                        Add test log
                    </Button>

                    <Button size="sm" onClick={copyFiles} className="h-7 text-xs ml-2">
                        Copy Files
                    </Button>

                    <PopoverSettings />
                    <ButtonQuickToggleThemeMode />
                    <TopMenu />
                </div>
            </div>

        </div>
    );
}
