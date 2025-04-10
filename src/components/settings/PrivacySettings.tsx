
import { Save, Navigation, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface PrivacySettingsProps {
  settings: {
    profileVisibility: string;
    locationSharing: boolean;
    manualLocationUpdate: boolean;
    useGeolocationForNeighborhood: boolean;
  };
  onSettingChange: (setting: string, value: boolean | string) => void;
  onActivateGeolocation: () => void;
}

const PrivacySettings = ({ 
  settings, 
  onSettingChange, 
  onActivateGeolocation 
}: PrivacySettingsProps) => {
  const { toast } = useToast();
  
  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Manage your privacy and data sharing preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Profile Visibility</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Control who can see your profile
            </p>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant={settings.profileVisibility === 'public' ? 'warm' : 'outline'}
                onClick={() => onSettingChange('profileVisibility', 'public')}
                className="justify-start"
              >
                <Check className={`h-4 w-4 mr-2 ${settings.profileVisibility === 'public' ? 'opacity-100' : 'opacity-0'}`} />
                Public
              </Button>
              
              <Button 
                variant={settings.profileVisibility === 'connections' ? 'warm' : 'outline'}
                onClick={() => onSettingChange('profileVisibility', 'connections')}
                className="justify-start"
              >
                <Check className={`h-4 w-4 mr-2 ${settings.profileVisibility === 'connections' ? 'opacity-100' : 'opacity-0'}`} />
                Connections Only
              </Button>
              
              <Button 
                variant={settings.profileVisibility === 'private' ? 'warm' : 'outline'}
                onClick={() => onSettingChange('profileVisibility', 'private')}
                className="justify-start"
              >
                <Check className={`h-4 w-4 mr-2 ${settings.profileVisibility === 'private' ? 'opacity-100' : 'opacity-0'}`} />
                Private
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Location Sharing</h4>
              <p className="text-sm text-muted-foreground">
                Share your approximate location to find nearby moms
              </p>
            </div>
            <Switch
              checked={settings.locationSharing}
              onCheckedChange={(checked) => 
                onSettingChange('locationSharing', checked)
              }
              className="data-[state=checked]:bg-pastel-yellow"
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Manual Location Updates</h4>
              <p className="text-sm text-muted-foreground">
                Only update location when you tap the location pin
              </p>
            </div>
            <Switch
              checked={settings.manualLocationUpdate}
              onCheckedChange={(checked) => 
                onSettingChange('manualLocationUpdate', checked)
              }
              className="data-[state=checked]:bg-pastel-yellow"
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Geolocation for Address</h4>
              <p className="text-sm text-muted-foreground">
                Automatically determine location from your address
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={settings.useGeolocationForNeighborhood}
                onCheckedChange={(checked) => 
                  onSettingChange('useGeolocationForNeighborhood', checked)
                }
                className="data-[state=checked]:bg-pastel-yellow"
              />
            </div>
          </div>
          
          <Button 
            variant="warm" 
            className="w-full mt-4"
            onClick={onActivateGeolocation}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Activate Current Location
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={handleSavePrivacy}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Privacy Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;
