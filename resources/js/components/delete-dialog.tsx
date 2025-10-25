import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type DeleteDialogProps = {
    id: any;
    onDelete: (e: React.FormEvent<HTMLFormElement>) => void;
    onOpenChange: (id: any) => void;
};

export const DeleteDialog = ({
    id,
    onDelete,
    onOpenChange,
}: DeleteDialogProps) => {
    return (
        <AlertDialog open={id} onOpenChange={() => onOpenChange(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        You want to delete data, note this action is
                        irreversible.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {id && (
                        <form onSubmit={onDelete}>
                            <Button variant="destructive" type="submit">
                                <Trash />
                                Delete
                            </Button>
                        </form>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
