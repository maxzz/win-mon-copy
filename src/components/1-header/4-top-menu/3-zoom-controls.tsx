import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/shadcn/dropdown-menu";
import { IconZoomMinus, IconZoomPlus, IconZoomReset } from "@/components/ui/icons/normal";
import { zoomAction } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { zoomLevelAtom } from "@/store/1-atoms/atom-zoom";

export function ZoomControls() {
    const zoomLevel = useAtomValue(zoomLevelAtom);
    const zoomPercent = Math.round((1.2 ** zoomLevel) * 100);

    return (
        <DropdownMenuItem className="focus:bg-transparent cursor-default justify-between" onSelect={(e) => e.preventDefault()}>
            <DropdownMenuLabel className="p-0 pl-2 text-xs font-normal">
                Zoom
            </DropdownMenuLabel>

            <div className="p-0.5 border rounded-md flex items-center">
                <Button className="size-6 rounded-sm" variant="ghost" size="icon" onClick={(e) => doZoomAction(e, 'out')} title="Zoom Out">
                    <IconZoomMinus className="size-3" />
                </Button>

                <span className="w-10 text-center text-xs tabular-nums">
                    {zoomPercent}%
                </span>

                <Button className="size-6 rounded-sm" variant="ghost" size="icon" onClick={(e) => doZoomAction(e, 'in')} title="Zoom In">
                    <IconZoomPlus className="size-3" />
                </Button>

                <Button className="ml-1 size-6 rounded-sm" variant="ghost" size="icon" onClick={(e) => doZoomAction(e, 'reset')} title="Reset Zoom" disabled={zoomLevel === 0}>
                    <IconZoomReset className="size-3" />
                </Button>
            </div>
        </DropdownMenuItem>
    );
}

function doZoomAction(e: React.MouseEvent<HTMLButtonElement>, action: 'out' | 'in' | 'reset'): void {
    e.preventDefault();
    e.stopPropagation();
    zoomAction(action);
}
