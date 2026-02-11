import { useSnapshot } from 'valtio';
import { useSetAtom } from 'jotai';
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { SelectTm } from '@/components/ui/ui-local/4-select-tm';
import { Button } from '@/components/ui/shadcn/button';
import { isOpenDlgAddProfileAtom } from '@/store/atoms-copy-files';

export function ProfileSelector() {
    const { profiles, activeProfileId } = useSnapshot(appSettings.userData);
    const profileIds = Object.keys(profiles ?? {});
    const doOpenAddDialog = useSetAtom(isOpenDlgAddProfileAtom);

    function setActiveProfile(v: string) {
        appSettings.userData.activeProfileId = v;
    }
    
    if (!profileIds.length) {
        return (
            <Button
                className="h-7 px-2 text-xs"
                variant="outline"
                size="sm"
                onClick={() => doOpenAddDialog(true)}
                title="Add Profile..."
            >
                Add Profile...
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-1">
            <SelectTm
                items={profileIds}
                value={activeProfileId}
                onValueChange={setActiveProfile}
                triggerClasses="w-32"
                placeholder="Select Profile"
                asPopover
            />
        </div>
    );
}
