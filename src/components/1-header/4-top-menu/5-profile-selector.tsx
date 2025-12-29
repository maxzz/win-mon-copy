import { useSnapshot } from 'valtio';
import { useAtom, useSetAtom } from 'jotai';
import { Plus, Trash2 } from 'lucide-react';
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { Button } from '@/components/ui/shadcn/button';
import { SelectTm } from '@/components/ui/ui-local/4-select-tm';
import { copyFilesAtom, isAddProfileOpenAtom, isDeleteProfileOpenAtom } from '@/store/atoms-copy-files';
import { DialogAddProfile } from './6-dialog-add-profile';
import { DialogDeleteProfile } from './7-dialog-delete-profile';

export function ProfileSelector() {
    const { userData } = useSnapshot(appSettings);
    // Ensure profiles exist (migration might happen after render or default state)
    const profiles = userData.profiles ? Object.keys(userData.profiles) : [];
    const activeProfile = userData.activeProfileId;

    const setIsAddOpen = useSetAtom(isAddProfileOpenAtom);
    const setIsDeleteOpen = useSetAtom(isDeleteProfileOpenAtom);

    const copyFiles = useSetAtom(copyFilesAtom);

    const handleCopy = () => {
        copyFiles();
    };

    return (
        <div className="flex items-center gap-1">
            <SelectTm
                items={profiles}
                value={activeProfile}
                onValueChange={(v) => appSettings.userData.activeProfileId = v}
                triggerClasses="w-32"
                placeholder="Select Profile"
                asPopover
            />

            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsAddOpen(true)} title="Add Profile">
                <Plus className="h-4 w-4" />
            </Button>

            <DialogAddProfile />

            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => setIsDeleteOpen(true)}
                disabled={profiles.length <= 1}
                title="Delete Profile"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <DialogDeleteProfile activeProfile={activeProfile} />

            <Button size="sm" onClick={handleCopy} className="h-7 text-xs ml-2">Copy Files</Button>
        </div>
    );
}
