import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Props {
  deleteModal: boolean,
  setDeleteModal: (deleteModal: boolean) => void
  handleDeleteOpinion: () => void
}

const DeleteModal = ({deleteModal, setDeleteModal , handleDeleteOpinion}: Props) => {

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    handleDeleteOpinion();
    setDeleteModal(false);
  }

  return (
     <AlertDialog open={deleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this Opinion?</AlertDialogTitle>
            <AlertDialogDescription>
                This action is destructive, and you will not be able to recover your Opinion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleClose}
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default DeleteModal