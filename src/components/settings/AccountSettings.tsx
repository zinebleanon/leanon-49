
import { useState } from 'react';
import { Key, MapPin, LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import PasswordChangeForm, { PasswordData } from './PasswordChangeForm';
import NeighborhoodUpdateForm from './NeighborhoodUpdateForm';
import { useUserInfo } from '@/hooks/use-user-info';

interface AccountSettingsProps {
  onLogout: () => void;
}

const AccountSettings = ({ onLogout }: AccountSettingsProps) => {
  const { toast } = useToast();
  const { userInfo, updateNeighborhoodWithGeolocation, toggleGeolocationForNeighborhood } = useUserInfo();
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingNeighborhood, setIsUpdatingNeighborhood] = useState(false);
  const [useGeolocationForNeighborhood, setUseGeolocationForNeighborhood] = useState(
    userInfo?.useGeolocationForNeighborhood || false
  );
  
  const handlePasswordChange = (passwordData: PasswordData) => {
    // In a real app, we would call an API to update the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setIsChangingPassword(false);
  };
  
  const handleToggleGeolocation = (enabled: boolean) => {
    setUseGeolocationForNeighborhood(enabled);
    toggleGeolocationForNeighborhood(enabled);
  };
  
  const handleNeighborhoodUpdate = async (neighborhood: string) => {
    const success = await updateNeighborhoodWithGeolocation(neighborhood);
    
    if (success) {
      toast({
        title: "Neighborhood updated",
        description: useGeolocationForNeighborhood 
          ? "Your neighborhood and location have been updated automatically."
          : "Your neighborhood has been updated.",
      });
      setIsUpdatingNeighborhood(false);
    } else {
      toast({
        title: "Error",
        description: "There was a problem updating your neighborhood.",
        variant: "destructive",
      });
    }
  };
  
  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
  };
  
  const cancelNeighborhoodUpdate = () => {
    setIsUpdatingNeighborhood(false);
    setUseGeolocationForNeighborhood(userInfo?.useGeolocationForNeighborhood || false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account security and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isChangingPassword ? (
            <PasswordChangeForm 
              onCancel={cancelPasswordChange}
              onSubmit={handlePasswordChange}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setIsChangingPassword(true)}
              >
                <Key className="mr-2 h-4 w-4" />
                Change
              </Button>
            </div>
          )}
          
          <Separator />
          
          {isUpdatingNeighborhood ? (
            <NeighborhoodUpdateForm 
              initialNeighborhood={userInfo?.neighborhood || ''}
              useGeolocation={useGeolocationForNeighborhood}
              onCancel={cancelNeighborhoodUpdate}
              onSubmit={handleNeighborhoodUpdate}
              onToggleGeolocation={handleToggleGeolocation}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Update Neighborhood</h4>
                <p className="text-sm text-muted-foreground">
                  Change your location information
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setIsUpdatingNeighborhood(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Update
              </Button>
            </div>
          )}
          
          <Separator />
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
