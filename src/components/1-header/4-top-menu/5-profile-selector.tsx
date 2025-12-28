import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Plus, Trash2 } from 'lucide-react';
import { appSettings } from '@/store/1-atoms/9-ui-state/0-local-storage-app/1-local-storage';
import { R2MCalls } from '@/shared/2-gates-in-client-as-atoms/commands-to-main/1-calls-renderer-to-main';
import { Button } from '@/components/ui/shadcn/button';
import { SelectTm } from '@/components/ui/ui-local/4-select-tm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';

export function ProfileSelector() {
    const { userData } = useSnapshot(appSettings);
    // Ensure profiles exist (migration might happen after render or default state)
    const profiles = userData.sourcePathProfiles ? Object.keys(userData.sourcePathProfiles) : [];
    const activeProfile = userData.activeProfileId;

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleCopy = () => {
        const pathEntries = userData.sourcePathProfiles[activeProfile];
        if (!pathEntries) return;
        const sourcePaths = pathEntries.filter(p => p.inUse).map(p => p.path);
        R2MCalls.copyFiles({ mode: activeProfile, sourcePaths });
    };

    const handleAdd = () => {
        if (newProfileName && !userData.sourcePathProfiles[newProfileName]) {
            appSettings.userData.sourcePathProfiles[newProfileName] = [];
            appSettings.userData.activeProfileId = newProfileName;
            setIsAddOpen(false);
            setNewProfileName('');
        }
    };

    const handleDelete = () => {
        if (profiles.length > 1) {
            const newProfiles = profiles.filter(p => p !== activeProfile);
            delete appSettings.userData.sourcePathProfiles[activeProfile];
            appSettings.userData.activeProfileId = newProfiles[0];
            setIsDeleteOpen(false);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <SelectTm
                items={profiles}
                value={activeProfile}
                onValueChange={(v) => appSettings.userData.activeProfileId = v}
                triggerClasses="w-32"
                placeholder="Select Profile"
            />

            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setIsAddOpen(true)} title="Add Profile">
                <Plus className="h-4 w-4" />
            </Button>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Profile</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={newProfileName}
                                onChange={e => setNewProfileName(e.target.value)}
                                className="col-span-3"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAdd();
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAdd}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => setIsDeleteOpen(true)}
                disabled={profiles.length <= 1}
                title="Delete Profile"
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Profile</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete profile "{activeProfile}"?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Button size="sm" onClick={handleCopy} className="h-7 text-xs ml-2">Copy Files</Button>
        </div>
    );
}

