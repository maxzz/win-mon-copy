import { useAtom, useSetAtom } from 'jotai';
import { doDeleteProfileAtom, isOpenDlgDeleteProfileAtom } from '@/store/atoms-copy-files';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/shadcn/dialog';
import { notice } from '@/components/ui/ui-local/7-toaster';

export function DialogDeleteProfile({ activeProfile }: { activeProfile: string; }) {
    const [isDeleteOpen, setIsDeleteOpen] = useAtom(isOpenDlgDeleteProfileAtom);
    const deleteProfile = useSetAtom(doDeleteProfileAtom);

    function handleDelete() {
        if (!deleteProfile()) {
            notice.error('Failed to delete profile.');
            return;
        }
        setIsDeleteOpen(false);
    }

    return (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="w-auto sm:max-w-[400px]" modal>
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
                    <Button className="text-white dark:text-black" variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
