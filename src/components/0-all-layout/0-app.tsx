import { useSnapshot } from "valtio";
import { UISymbolDefs } from "@/components/ui";
import { OnAppMount, WorldToReactListener } from "@/shared/2-gates-in-client-as-atoms";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";
import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3_Footer } from "../3-footer";
import { DialogAddProfile } from "../4-dialogs/0-all/1-dialog-add-profile";
import { DialogDeleteProfile } from "../4-dialogs/0-all/2-dialog-delete-profile";
import { DialogAbout } from "../4-dialogs/0-all/3-dialog-about";
import { DropItDoc } from "../ui/ui-local/6-dnd/ui-drop-it-doc";
import { doSetFilesFrom_Dnd_Atom } from "../ui/ui-local/6-dnd/8-atoms";
import { Toaster } from "../ui/shadcn/sonner";

export function App() {
    return (<>
        <UISymbolDefs />
        <WorldToReactListener />
        <OnAppMount />
        <AppLayout />
        <DropItDoc doSetFilesFromDropAtom={doSetFilesFrom_Dnd_Atom} />
        <Toaster />
    </>);
}

function AppLayout() {
    return (
        <div className="h-screen bg-background grid grid-rows-[auto_1fr_auto] 1debug-screens 1debug-grid-16 smallscroll">
            <Section1Header />
            <Section2Main />
            <Section3_Footer />

            <Dialogs />
        </div>
    );
}

function Dialogs() {
    const { userData } = useSnapshot(appSettings);
    const activeProfile = userData.activeProfileId;
    return (<>
        <DialogAddProfile />
        <DialogDeleteProfile activeProfile={activeProfile} />
        <DialogAbout />
    </>);
}
