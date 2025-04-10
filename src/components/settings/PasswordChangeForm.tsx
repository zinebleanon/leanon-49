
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PasswordChangeFormProps {
  onCancel: () => void;
  onSubmit: (data: PasswordData) => void;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordChangeForm = ({ onCancel, onSubmit }: PasswordChangeFormProps) => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!passwordData.currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(passwordData);
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-3">Change Your Password</h4>
      <div className="space-y-3 mb-4">
        <Input 
          type="password" 
          placeholder="Current Password" 
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
          showPasswordToggle
        />
        <Input 
          type="password" 
          placeholder="New Password" 
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
          showPasswordToggle
        />
        <Input 
          type="password" 
          placeholder="Confirm New Password" 
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
          showPasswordToggle
        />
      </div>
      <div className="flex gap-2">
        <Button variant="warm" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
