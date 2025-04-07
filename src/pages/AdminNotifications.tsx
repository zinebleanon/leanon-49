import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, MessageSquare, Settings, ArrowLeft, BellRing } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { sendPushNotification } from '@/utils/pushNotifications';
import ProtectedRoute from '@/components/ProtectedRoute';

// Mock notification data
const mockNotifications = [
  { id: 1, title: 'New Community Feature', message: 'Check out our new community feature!', sent: new Date('2025-03-29'), userGroup: 'all' },
  { id: 2, title: 'Special Offer', message: 'Limited time discount for premium members', sent: new Date('2025-04-01'), userGroup: 'premium' },
  { id: 3, title: 'System Maintenance', message: 'Planned downtime on April 5th', scheduled: new Date('2025-04-05'), userGroup: 'all' },
];

const AdminNotifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [adminCode, setAdminCode] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNewNotification, setShowNewNotification] = useState(false);
  const [showPersonalizationHelp, setShowPersonalizationHelp] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: '',
      message: '',
      userGroup: 'all',
      schedule: false,
      scheduleDate: '',
      personalize: true,
    },
  });

  useEffect(() => {
    toast({
      title: 'Admin Access Granted',
      description: 'You now have direct access to notification management.',
    });
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const onSubmit = async (data: any) => {
    const newNotification = {
      id: notifications.length + 1,
      title: data.title,
      message: data.message,
      userGroup: data.userGroup,
      ...(data.schedule 
        ? { scheduled: new Date(data.scheduleDate) } 
        : { sent: new Date() }
      ),
    };
    
    setNotifications([...notifications, newNotification]);
    
    if (!data.schedule) {
      const success = await sendPushNotification(
        data.title, 
        data.message,
        data.userGroup
      );
      
      if (success) {
        toast({
          title: 'Notification Sent',
          description: `"${data.title}" has been sent successfully with personalization.`,
        });
      } else {
        toast({
          title: 'Notification Sent (Preview)',
          description: 'The notification was displayed as a preview. In production, it would be sent to all users.',
        });
      }
    } else {
      toast({
        title: 'Notification Scheduled',
        description: `"${data.title}" has been scheduled for ${new Date(data.scheduleDate).toLocaleString()}.`,
      });
    }
    
    setShowNewNotification(false);
    form.reset();
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: 'Notification Deleted',
      description: 'The notification has been removed.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Admin Notification Center</h1>
        
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Push Notifications</h2>
              <p className="text-muted-foreground">Manage and send personalized notifications to users</p>
            </div>
            <Button 
              onClick={() => setShowNewNotification(!showNewNotification)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              {showNewNotification ? 'Cancel' : 'New Notification'}
            </Button>
          </div>
          
          {showNewNotification && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Notification</CardTitle>
                <CardDescription>
                  Compose a personalized notification to send to users.
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-6"
                    onClick={() => setShowPersonalizationHelp(!showPersonalizationHelp)}
                  >
                    Help
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showPersonalizationHelp && (
                  <Alert className="mb-4">
                    <BellRing className="h-4 w-4" />
                    <AlertTitle>Personalization Tips</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use <code className="bg-muted px-1 rounded">{'{userName}'}</code> in your message to include the recipient's name</li>
                        <li>Example: "Hello {'{userName}'}, check out our new features!"</li>
                        <li>If no placeholder is found, the name will be added at the beginning of the message</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter title" {...field} required />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter notification message (use {userName} for personalization)" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormDescription>
                            Example: "Hello {'{userName}'}, we have a new feature for you!"
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="userGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Group</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="all">All Users</option>
                              <option value="premium">Premium Users</option>
                              <option value="new">New Users</option>
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Schedule for later</FormLabel>
                            <FormDescription>
                              Set a future date and time for this notification
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch('schedule') && (
                      <FormField
                        control={form.control}
                        name="scheduleDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Date</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" type="button" onClick={() => setShowNewNotification(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {form.watch('schedule') ? 'Schedule Notification' : 'Send Now'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-4">Past & Scheduled Notifications</h3>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User Group</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No notifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>{notification.message}</TableCell>
                      <TableCell>
                        {notification.sent ? (
                          <span className="flex items-center gap-1">
                            <Bell className="h-4 w-4 text-green-500" />
                            Sent {notification.sent.toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <BellOff className="h-4 w-4 text-amber-500" />
                            Scheduled {notification.scheduled?.toLocaleDateString()}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{notification.userGroup}</span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminNotifications;
