
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";
import EditKidForm from "./EditKidForm";

interface EditProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "profile" | "kid";
  kidIndex?: number; // Only used when mode is "kid"
  title: string;
  description: string;
}

const EditProfileDialog = ({
  isOpen,
  onOpenChange,
  mode,
  kidIndex,
  title,
  description,
}: EditProfileDialogProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        {mode === "profile" && (
          <EditProfileForm onSuccess={handleSuccess} />
        )}
        
        {mode === "kid" && (
          <EditKidForm kidIndex={kidIndex} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
