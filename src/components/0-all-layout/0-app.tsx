import { UISymbolDefs } from "../ui";
import { OnAppMount, WorldToReactListener } from "../../shared/2-gates-in-client-as-atoms";
import { Section1Header } from "../1-header";
import { Section2Main } from "../2-main";
import { Section3_Footer } from "../3-footer";
import { DialogDeleteProfile } from "../2-main/4-dialogs/7-dialog-delete-profile";
import { DialogAddProfile } from "../2-main/4-dialogs/6-dialog-add-profile";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage";

export function App() {
    return (<>
        <UISymbolDefs />
        <AppLayout />
        <WorldToReactListener />
        <OnAppMount />
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
    </>);
}
