import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { doAddProfileAtom, isDlgAddProfileOpenAtom } from '@/store/atoms-copy-files';

export function DialogAddProfile() {
    const [isAddOpen, setIsAddOpen] = useAtom(isDlgAddProfileOpenAtom);
    const addProfile = useSetAtom(doAddProfileAtom);
    const [newProfileName, setNewProfileName] = useState('');

    const handleAdd = () => {
        if (addProfile(newProfileName)) {
            setIsAddOpen(false);
            setNewProfileName('');
        }
    };

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
                            if (e.key === 'Enter') handleAdd();
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
