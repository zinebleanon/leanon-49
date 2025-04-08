
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Shield, User, Key, MapPin, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationSubscriber from '@/components/NotificationSubscriber';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    profileVisibility: 'public',
    locationSharing: true,
  });
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
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
          <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full">
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Profile</span>
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
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        handleSettingChange('emailNotifications', checked)
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <NotificationSubscriber />
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
                    />
                  </div>
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
                        variant={settings.profileVisibility === 'public' ? 'default' : 'outline'}
                        onClick={() => handleSettingChange('profileVisibility', 'public')}
                        className="justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Public - All moms can see your profile
                      </Button>
                      
                      <Button 
                        variant={settings.profileVisibility === 'connections' ? 'default' : 'outline'}
                        onClick={() => handleSettingChange('profileVisibility', 'connections')}
                        className="justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Connections Only - Only your connections can see your profile
                      </Button>
                      
                      <Button 
                        variant={settings.profileVisibility === 'private' ? 'default' : 'outline'}
                        onClick={() => handleSettingChange('profileVisibility', 'private')}
                        className="justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Private - Your profile is hidden from search
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
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">
                    Edit Basic Information
                  </Button>
                  
                  <Button className="w-full">
                    Update Profile Picture
                  </Button>
                  
                  <Button className="w-full">
                    Manage Kids Information
                  </Button>
                  
                  <Button className="w-full">
                    Update Interests
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
                  <Button variant="outline" className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Neighborhood
                  </Button>
                  
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
