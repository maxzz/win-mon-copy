import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { addProfileAtom, isAddProfileOpenAtom } from '@/store/atoms-copy-files';

export function DialogAddProfile() {
    const [isAddOpen, setIsAddOpen] = useAtom(isAddProfileOpenAtom);
    const addProfile = useSetAtom(addProfileAtom);
    const [newProfileName, setNewProfileName] = useState('');

    const handleAdd = () => {
        if (addProfile(newProfileName)) {
            setIsAddOpen(false);
            setNewProfileName('');
        }
    };

    return (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add New Profile
                    </DialogTitle>
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
    );
}
