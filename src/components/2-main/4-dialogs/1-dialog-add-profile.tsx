import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/shadcn/dialog';
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
            <DialogContent className="w-auto sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        Add New Profile
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4 grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        className="col-span-3"
                        id="name"
                        value={newProfileName}
                        onChange={e => setNewProfileName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAdd();
                        }}
                    />
                </div>

                <DialogFooter>
                    <Button onClick={handleAdd} size="sm">Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
