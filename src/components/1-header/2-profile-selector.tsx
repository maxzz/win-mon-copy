import { useSnapshot } from 'valtio';
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { SelectTm } from '@/components/ui/ui-local/4-select-tm';

export function ProfileSelector() {
    const { profiles, activeProfileId } = useSnapshot(appSettings.userData);

    function setActiveProfile(v: string) {
        appSettings.userData.activeProfileId = v;
    }
    
    return (
        <div className="flex items-center gap-1">
            <SelectTm
                items={Object.keys(profiles)}
                value={activeProfileId}
                onValueChange={setActiveProfile}
                triggerClasses="w-32"
                placeholder="Select Profile"
                asPopover
            />
        </div>
    );
}
