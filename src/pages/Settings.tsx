
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Shield, Key, MapPin, LogOut, Save, Check, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import NotificationSubscriber from '@/components/NotificationSubscriber';
import { useUserInfo } from '@/hooks/use-user-info';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const { toast } = useToast();
  const { 
    userInfo, 
    updateUserInfo, 
    toggleManualLocationUpdate, 
    toggleGeolocationForNeighborhood,
    updateNeighborhoodWithGeolocation
  } = useUserInfo();
  
  const [settings, setSettings] = useState({
    pushNotifications: false,
    marketingEmails: false,
    profileVisibility: userInfo?.profileVisibility || 'public',
    locationSharing: userInfo?.locationSharing || true,
    manualLocationUpdate: userInfo?.manualLocationUpdate || false,
    useGeolocationForNeighborhood: userInfo?.useGeolocationForNeighborhood || false,
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Neighborhood update state
  const [neighborhood, setNeighborhood] = useState(userInfo?.neighborhood || '');
  const [isUpdatingNeighborhood, setIsUpdatingNeighborhood] = useState(false);
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Also update in user info if relevant
    const userInfoUpdate: any = {};
    if (setting === 'profileVisibility' || setting === 'locationSharing') {
      userInfoUpdate[setting] = value;
      updateUserInfo(userInfoUpdate);
    } else if (setting === 'manualLocationUpdate') {
      // Update the manual location update setting
      toggleManualLocationUpdate(value as boolean);
    } else if (setting === 'useGeolocationForNeighborhood') {
      // Update the geolocation for neighborhood setting
      toggleGeolocationForNeighborhood(value as boolean);
    }
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };
  
  const handlePasswordChange = () => {
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
    
    // In a real app, we would call an API to update the password
    // For this demo, we'll just show a success message
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Reset form and close it
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsChangingPassword(false);
  };
  
  const handleNeighborhoodUpdate = async () => {
    if (!neighborhood) {
      toast({
        title: "Error",
        description: "Please enter your neighborhood or address.",
        variant: "destructive",
      });
      return;
    }
    
    // Update neighborhood and location based on settings
    const success = await updateNeighborhoodWithGeolocation(neighborhood);
    
    if (success) {
      toast({
        title: "Neighborhood updated",
        description: settings.useGeolocationForNeighborhood 
          ? "Your neighborhood and location have been updated automatically."
          : "Your neighborhood has been updated.",
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem updating your neighborhood.",
        variant: "destructive",
      });
    }
    
    // Close the form
    setIsUpdatingNeighborhood(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-3xl mx-auto pt-24 pb-24 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
          Account Settings
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="account">
              <Key className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how you receive notifications from LeanOn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <NotificationSubscriber className="bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground border-pastel-yellow" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and promotions
                      </p>
                    </div>
                    <Switch
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => 
                        handleSettingChange('marketingEmails', checked)
                      }
                      className="data-[state=checked]:bg-pastel-yellow"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => {
                      toast({
                        title: "Notification preferences saved",
                        description: "Your notification settings have been updated.",
                      });
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
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
                        onClick={() => handleSettingChange('profileVisibility', 'public')}
                        className="justify-start"
                      >
                        <Check className={`h-4 w-4 mr-2 ${settings.profileVisibility === 'public' ? 'opacity-100' : 'opacity-0'}`} />
                        Public
                      </Button>
                      
                      <Button 
                        variant={settings.profileVisibility === 'connections' ? 'warm' : 'outline'}
                        onClick={() => handleSettingChange('profileVisibility', 'connections')}
                        className="justify-start"
                      >
                        <Check className={`h-4 w-4 mr-2 ${settings.profileVisibility === 'connections' ? 'opacity-100' : 'opacity-0'}`} />
                        Connections Only
                      </Button>
                      
                      <Button 
                        variant={settings.profileVisibility === 'private' ? 'warm' : 'outline'}
                        onClick={() => handleSettingChange('profileVisibility', 'private')}
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
                        handleSettingChange('locationSharing', checked)
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
                        handleSettingChange('manualLocationUpdate', checked)
                      }
                      className="data-[state=checked]:bg-pastel-yellow"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => {
                      toast({
                        title: "Privacy settings saved",
                        description: "Your privacy preferences have been updated.",
                      });
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
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
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Change Your Password</h4>
                      <div className="space-y-3 mb-4">
                        <Input 
                          type="password" 
                          placeholder="Current Password" 
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        />
                        <Input 
                          type="password" 
                          placeholder="New Password" 
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        />
                        <Input 
                          type="password" 
                          placeholder="Confirm New Password" 
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="warm" onClick={handlePasswordChange}>
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
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
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-3">Update Your Neighborhood</h4>
                      <div className="space-y-3 mb-4">
                        <Input 
                          type="text" 
                          placeholder="Enter your neighborhood or address" 
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                        />
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="use-geolocation"
                            checked={settings.useGeolocationForNeighborhood}
                            onCheckedChange={(checked) => 
                              handleSettingChange('useGeolocationForNeighborhood', checked)
                            }
                            className="data-[state=checked]:bg-pastel-yellow"
                          />
                          <label 
                            htmlFor="use-geolocation" 
                            className="text-sm cursor-pointer flex items-center"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Automatically determine my location from address
                          </label>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {settings.useGeolocationForNeighborhood 
                            ? "When enabled, we'll automatically set your pin location based on your address."
                            : "When disabled, we'll only update your neighborhood name without changing your pin location."}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="warm" onClick={handleNeighborhoodUpdate}>
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setIsUpdatingNeighborhood(false);
                          setNeighborhood(userInfo?.neighborhood || '');
                          setSettings(prev => ({
                            ...prev,
                            useGeolocationForNeighborhood: userInfo?.useGeolocationForNeighborhood || false
                          }));
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
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
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
