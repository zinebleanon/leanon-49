
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUserInfo } from '@/hooks/use-user-info';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useUserInfo();
  
  useEffect(() => {
    // Simulate loading notifications from an API
    const timeout = setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Connection Request',
          message: 'Sarah would like to connect with you!',
          timestamp: '2025-04-07T14:30:00Z',
          read: false
        },
        {
          id: '2',
          title: 'New Deal Available',
          message: 'Check out the new exclusive deal from Baby Shop!',
          timestamp: '2025-04-06T10:15:00Z',
          read: false
        },
        {
          id: '3',
          title: 'Welcome to LeanOn',
          message: 'Thanks for joining our community of moms!',
          timestamp: '2025-04-05T08:45:00Z',
          read: true
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-3xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Notifications</h1>
          
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={markAllAsRead}
          >
            <Check className="mr-2 h-3 w-3" />
            Mark all as read
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You don't have any notifications at the moment.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(notification.timestamp)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
