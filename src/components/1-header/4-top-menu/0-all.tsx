import { useSnapshot } from 'valtio';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/components/ui/icons/normal";
import { ThemeSubMenu } from "./2-theme-sub-menu";
import { exitApp, toggleDevTools } from "@/shared/2-gates-in-client-as-atoms/3-to-main-apis";
import { ZoomControls } from "./3-zoom-controls";
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { isDlgAboutOpenAtom, isDlgAddProfileOpenAtom, isDlgDeleteProfileOpenAtom } from '@/store/atoms-copy-files';

export function TopMenu() {
    const { userData } = useSnapshot(appSettings);
    const profiles = userData.profiles ? Object.keys(userData.profiles) : [];
    const doOpenAddDialog = useSetAtom(isDlgAddProfileOpenAtom);
    const doOpenDeleteDialog = useSetAtom(isDlgDeleteProfileOpenAtom);
    const doOpenAboutDialog = useSetAtom(isDlgAboutOpenAtom);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12') {
                toggleDevTools();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-6 focus-visible:ring-0" variant="ghost" size="icon" title="Options">
                    <IconMenuHamburger5 className="size-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mx-1 1min-w-64 overflow-hidden">
                <DropdownMenuItem className="cursor-pointer" onClick={() => doOpenAddDialog(true)}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Add Profile...</DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => doOpenDeleteDialog(true)} disabled={profiles.length <= 1}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Delete Profile...</DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <ZoomControls />
                <ThemeSubMenu />
                
                <DropdownMenuItem className="cursor-pointer" onClick={() => toggleDevTools()}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal flex justify-between w-full">
                        <span>Toggle Developer Tools</span>
                        <span className="opacity-50 ml-4">F12</span>
                    </DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => doOpenAboutDialog(true)}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">About...</DropdownMenuLabel>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="focus:text-destructive cursor-pointer" onClick={() => exitApp()}>
                    <DropdownMenuLabel className="py-0 text-xs font-normal">Exit</DropdownMenuLabel>
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    );
}
