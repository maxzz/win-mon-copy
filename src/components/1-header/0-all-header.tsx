import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { IconMicroscope } from "../ui/icons/normal";
import { PopoverSettings } from "../4-dialogs/7-settings-dialog";
import { TopMenu } from "./4-top-menu";
import { ButtonQuickToggleThemeMode } from "./3-button-theme-toggle";
import { ButtonToggleFilePanels } from "./1-button-file-panels-toggle";

export function Section1Header({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
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
                    {/* Add here single button to quick toggle dark/light theme without system mode */}
                    <ButtonToggleFilePanels />
                    <PopoverSettings />
                    <ButtonQuickToggleThemeMode />
                    <TopMenu />
                </div>
            </div>

        </div>
    );
}
