
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Shield, Key } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import AccountSettings from '@/components/settings/AccountSettings';
import { useSettings } from '@/hooks/use-settings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const {
    settings,
    handleSettingChange,
    handleActivateGeolocation,
    handleLogout
  } = useSettings();
  
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
            <NotificationSettings 
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          </TabsContent>
          
          <TabsContent value="privacy">
            <PrivacySettings 
              settings={settings}
              onSettingChange={handleSettingChange}
              onActivateGeolocation={handleActivateGeolocation}
            />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountSettings onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
