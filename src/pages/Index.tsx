
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import { Settings, BellRing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  
  // Use the viewport height hook to fix iOS height issues
  useViewportHeight();
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const goToAdminPage = () => {
    navigate('/admin/notifications');
  };

  const tryNotification = async () => {
    if (Notification.permission !== "granted") {
      const permissionGranted = await askNotificationPermission();
      if (!permissionGranted) return;
    }
    
    // Get user name from local storage or use a default
    const userName = userInfo?.name || localStorage.getItem('notification_user_name') || 'User';
    
    // Send a test notification with the user's name
    sendPushNotification(
      "Welcome to LeanOn", 
      `Hello ${userName}, thanks for trying out our notification feature!`,
      "all"
    );
  };
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero onJoinClick={() => {}} />
      
      {/* Admin button - positioned discreetly at the bottom right */}
      <div className="fixed bottom-8 right-8 z-10 space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full w-10 h-10 p-0 bg-background/80 backdrop-blur-sm shadow-md block"
          onClick={goToAdminPage}
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Admin</span>
        </Button>
        
        <Button
          variant="warm"
          size="sm"
          className="rounded-full p-0 bg-background/80 backdrop-blur-sm shadow-md block w-10 h-10"
          onClick={tryNotification}
        >
          <BellRing className="h-4 w-4" />
          <span className="sr-only">Try Notification</span>
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
