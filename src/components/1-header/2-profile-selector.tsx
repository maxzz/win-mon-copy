import { useSnapshot } from 'valtio';
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { SelectTm } from '@/components/ui/ui-local/4-select-tm';

export function ProfileSelector() {
    const { profiles, activeProfileId } = useSnapshot(appSettings.userData);
    const profileIds = Object.keys(profiles ?? {});

    function setActiveProfile(v: string) {
        appSettings.userData.activeProfileId = v;
    }
    
    if (!profileIds.length) {
        return (
            <div className="flex items-center gap-1 text-xs opacity-60 select-none">
                No profiles
            </div>
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
