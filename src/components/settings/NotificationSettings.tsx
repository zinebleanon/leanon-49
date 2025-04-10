
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import NotificationSubscriber from '@/components/NotificationSubscriber';

interface NotificationSettingsProps {
  settings: {
    pushNotifications: boolean;
    marketingEmails: boolean;
  };
  onSettingChange: (setting: string, value: boolean | string) => void;
}

const NotificationSettings = ({ settings, onSettingChange }: NotificationSettingsProps) => {
  const { toast } = useToast();
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };

  return (
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
                onSettingChange('marketingEmails', checked)
              }
              className="data-[state=checked]:bg-pastel-yellow"
            />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={handleSaveNotifications}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Notification Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
