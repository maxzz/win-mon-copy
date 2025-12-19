import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { MainCopyPanel } from "./1-main-copy-panel";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("px-4 grid grid-rows-[auto_1fr_auto] gap-4 overflow-hidden", className)} {...rest}>
            <MainCopyPanel />
        </div>
    );
} 
