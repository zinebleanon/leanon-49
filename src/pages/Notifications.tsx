
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { trackUserActivity } from '@/utils/track-user-activity';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  feature: 'preloved' | 'deals';
  link?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const mockNotifications: Notification[] = [
        {
          id: '3',
          title: 'Preloved Item Sale',
          message: 'A baby carrier is now available at a discounted price',
          timestamp: '2025-04-05T08:45:00Z',
          read: false,
          feature: 'preloved',
          link: '/mumzmarketplace/items/456'
        },
        {
          id: '4',
          title: 'New Deal Available',
          message: 'Special offer on baby essentials this week',
          timestamp: '2025-04-04T16:20:00Z',
          read: false,
          feature: 'deals',
          link: '/mumzsave'
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'preloved':
        return <ShoppingBag className="h-4 w-4" />;
      case 'deals':
        return <Tag className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const markAsRead = async (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );

    await trackUserActivity({
      type: 'notifications_marked_all_read',
      description: `Marked notification ${id} as read`,
      metadata: { notificationId: id }
    });
  };
  
  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    
    await trackUserActivity({
      type: 'notification_deleted',
      description: `Deleted notification ${id}`,
      metadata: { notificationId: id }
    });
  };
  
  const markAllAsRead = async () => {
    const unreadCount = notifications.filter(n => !n.read).length;
    
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );

    await trackUserActivity({
      type: 'notifications_marked_all_read',
      description: `Marked all notifications as read`,
      metadata: { count: unreadCount }
    });

    toast({
      title: "Notifications Updated",
      description: `Marked ${unreadCount} notifications as read`,
    });
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.link) {
      await trackUserActivity({
        type: 'notification_clicked',
        description: `Clicked notification: ${notification.title}`,
        metadata: { 
          notificationId: notification.id,
          link: notification.link
        }
      });
      
      navigate(notification.link);
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || notification.feature === activeTab
  );
  
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
            Mark all as read
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <h3 className="text-xl font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You don't have any notifications at the moment.
            </p>
          </Card>
        ) : (
          <>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="preloved">Preloved</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary' : ''} 
                    ${notification.link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="text-muted-foreground">
                        {getFeatureIcon(notification.feature)}
                      </div>
                      <div>
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatDate(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          Mark as read
                        </Button>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;

