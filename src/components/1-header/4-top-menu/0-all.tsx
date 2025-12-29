import { useSnapshot } from 'valtio';
import { useSetAtom } from 'jotai';
import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { TestLinksSubMenu } from "./1-test-links";
import { ThemeSubMenu } from "./2-theme-sub-menu";
import { exitApp } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { ZoomControls } from "./3-zoom-controls";
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { isAddProfileOpenAtom, isDeleteProfileOpenAtom } from '@/store/atoms-copy-files';

export function TopMenu() {
    const { userData } = useSnapshot(appSettings);
    const profiles = userData.profiles ? Object.keys(userData.profiles) : [];
    const setIsAddOpen = useSetAtom(isAddProfileOpenAtom);
    const setIsDeleteOpen = useSetAtom(isDeleteProfileOpenAtom);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-6 focus-visible:ring-0" variant="ghost" size="icon" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mx-1 1min-w-64 overflow-hidden">
                {/* <TestLinksSubMenu />
                <DropdownMenuSeparator /> */}

                <DropdownMenuItem className="cursor-pointer" onClick={() => setIsAddOpen(true)}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Add Profile...</DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => setIsDeleteOpen(true)}
                    disabled={profiles.length <= 1}
                >
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Delete Profile...</DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <ZoomControls />
                <ThemeSubMenu />

                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="focus:text-destructive cursor-pointer" onClick={() => exitApp()}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Exit</DropdownMenuLabel>
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
