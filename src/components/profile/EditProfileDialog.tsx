
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";
import EditKidForm from "./EditKidForm";
import { ProfileSection } from "@/pages/Profile";
import { useEffect } from "react";
import { useUserInfo } from "@/hooks/use-user-info";

interface EditProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "profile" | "kid";
  kidIndex?: number; // Only used when mode is "kid"
  title: string;
  description: string;
  section?: ProfileSection; // New prop for specific section editing
}

const EditProfileDialog = ({
  isOpen,
  onOpenChange,
  mode,
  kidIndex,
  title,
  description,
  section = 'all',
}: EditProfileDialogProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  
  // Check if user has a referral code, if not, create one
  useEffect(() => {
    if (isOpen && userInfo && !userInfo.referralCode) {
      // Generate a referral code if the user doesn't have one
      const newReferralCode = 'LO' + Math.random().toString(36).substring(2, 8).toUpperCase();
      updateUserInfo({ referralCode: newReferralCode });
    }
  }, [isOpen, userInfo, updateUserInfo]);

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
          <EditProfileForm onSuccess={handleSuccess} section={section} />
        )}
        
        {mode === "kid" && (
          <EditKidForm kidIndex={kidIndex} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
