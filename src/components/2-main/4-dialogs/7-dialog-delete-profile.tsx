import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';
import { deleteProfileAtom, isDeleteProfileOpenAtom } from '@/store/atoms-copy-files';

export function DialogDeleteProfile({ activeProfile }: { activeProfile: string; }) {
    const [isDeleteOpen, setIsDeleteOpen] = useAtom(isDeleteProfileOpenAtom);

    const deleteProfile = useSetAtom(deleteProfileAtom);

    const handleDelete = () => {
        if (deleteProfile()) {
            setIsDeleteOpen(false);
        }
    };

    return (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Profile
                    </DialogTitle>
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
    );
}

