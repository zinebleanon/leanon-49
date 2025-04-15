
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Tag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@/hooks/use-notifications';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const navigate = useNavigate();
  const { 
    notifications, 
    isLoading, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();
  
  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'connect':
        return <Users className="h-4 w-4" />;
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

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.link) {
      await markAsRead(notification.id);
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
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="connect" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Connect
                </TabsTrigger>
                <TabsTrigger value="ask">
                  Ask
                </TabsTrigger>
                <TabsTrigger value="deals" className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Deals
                </TabsTrigger>
                <TabsTrigger value="preloved" className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" />
                  Preloved
                </TabsTrigger>
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
                          {formatDate(notification.created_at)}
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
