import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { MainCopyPanel } from "./1-main-copy-panel";
import { LogsPanel } from "./3-logs-panel";
import { PathsConfigSection } from "./2-path-input/1-paths-config-section";

export function Section2Main({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("px-4 grid overflow-hidden", className)} {...rest}>
            <div className="grid grid-rows-[auto_1fr] gap-4 h-full">

                <PathsConfigSection className="py-4" />

                {/* <div className="h-24">
                    <EntryInput inUse={true} path="test" onUpdate={(path) => { }} />
                </div> */}

                <LogsPanel />
            </div>

        </div>
    );
} 

// function EntryInput({ inUse, path, onUpdate }: { inUse: boolean; path: string; onUpdate: (path: string) => void; }) {
//     return (
//         <input
//             className={classNames(input0Classes, inputClasses, !inUse && "text-muted-foreground/40 line-through bg-muted/5")}
//             value={path}
//             onChange={(e) => onUpdate(e.target.value)}
//             placeholder="Enter path..."
//         />
//     );
// }

// const input0Classes = "\
// 1px-3 \
// 1py-1 \
// w-full \
// h-24 \
// text-sm \
// md:text-sm \
// border-input \
// bg-transparent \
// placeholder:text-muted-foreground \
// \
// 1focus-visible:outline-none \
// 1focus-visible:ring-1 \
// 1focus-visible:ring-ring \
// disabled:cursor-not-allowed \
// disabled:opacity-50 \
// \
// 1border \
// rounded-md \
// 1shadow-sm \
// 1transition-colors \
// flex \
// ";

// const inputClasses = "pl-8 pr-24 pb-0.5 h-full text-xs \
// rounded-none shadow-none transition-all \
// \
// focus:outline \
// focus:-outline-offset-4 \
// focus:outline-sky-500 \
// \
// focus:text-sky-500! \
// focus-visible:outline-2! \
// \
// ";
