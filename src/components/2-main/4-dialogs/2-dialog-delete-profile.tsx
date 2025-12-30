import { useAtom, useSetAtom } from 'jotai';
import { doDeleteProfileAtom, isDlgDeleteProfileOpenAtom } from '@/store/atoms-copy-files';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';

export function DialogDeleteProfile({ activeProfile }: { activeProfile: string; }) {
    const [isDeleteOpen, setIsDeleteOpen] = useAtom(isDlgDeleteProfileOpenAtom);

    const deleteProfile = useSetAtom(doDeleteProfileAtom);

    const handleDelete = () => {
        if (deleteProfile()) {
            setIsDeleteOpen(false);
        }
    };

    return (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="w-auto sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        Delete Profile
                    </DialogTitle>
                    <DialogDescription className="pt-2 py-3">
                        Are you sure you want to delete profile "{activeProfile}"?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="outline" size="sm" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

