import { useAtom } from "jotai";
import { envBuildVersion, envModifiedDate } from "@/utils";
import { isOpenDlgAboutAtom } from "@/store/atoms-copy-files";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { IconBinocular } from "@/components/ui/icons";

export function DialogAbout() {
    const [open, onOpenChange] = useAtom(isOpenDlgAboutAtom);
    // Using hardcoded values matching the C++ resource request
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="px-4 py-3 w-auto sm:max-w-[400px] text-xs">
                <DialogHeader>
                    <DialogTitle className="ml-0.5 text-sm">About</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[auto_1fr] gap-2">

                    <div className="px-1 bg-sky-500/5 rounded flex items-center justify-center">
                        <IconBinocular className="p-1 size-12 border-sky-500 border rounded shadow" />
                    </div>

                    <div className="my-2 text-xs">
                        <p className="mb-1 font-semibold">Copy Files Monitor</p>
                        <p>Version: {envBuildVersion()}</p>
                        <p>Build Date: <span className="mt-2 text-[.6rem]">{envModifiedDate()}</span></p>
                        
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>OK</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
