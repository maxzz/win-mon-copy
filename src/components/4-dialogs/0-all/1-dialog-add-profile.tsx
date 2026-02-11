import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { doAddProfileAtom, isOpenDlgAddProfileAtom } from '@/store/atoms-copy-files';
import { notice } from '@/components/ui/ui-local/7-toaster';

export function DialogAddProfile() {
    const [isAddOpen, setIsAddOpen] = useAtom(isOpenDlgAddProfileAtom);
    const [newProfileName, setNewProfileName] = useState('');
    const addProfile = useSetAtom(doAddProfileAtom);

    function handleAdd() {
        if (!newProfileName.trim()) {
            notice.error('Profile name cannot be empty.');
            return;
        }
        if (!addProfile(newProfileName)) {
            notice.error('Profile name already exists.');
            return;
        }
        setIsAddOpen(false);
        setNewProfileName('');
    }

    return (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogContent className="w-auto sm:max-w-[400px]" modal>
                <DialogHeader>
                    <DialogTitle>
                        New Profile
                    </DialogTitle>
                    <DialogDescription>
                        Enter the name of the new profile.
                    </DialogDescription>
                </DialogHeader>

                <div className="pb-2 pt-2 grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        className="col-span-3"
                        id="name"
                        value={newProfileName}
                        onChange={e => setNewProfileName(e.target.value.trim())}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAdd();
                            }
                        }}
                    />
                </div>

                <DialogFooter>
                    <Button onClick={handleAdd} disabled={!newProfileName.trim()} size="sm">
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
