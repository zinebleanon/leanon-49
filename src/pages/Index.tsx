
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import { BellRing, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import BowRibbon from '@/components/mumzally/BowRibbon';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [referralCode, setReferralCode] = useState('LO' + Math.random().toString(36).substring(2, 8).toUpperCase());
  
  // Use the viewport height hook to fix iOS height issues
  useViewportHeight();
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share it with your friends to invite them to LeanOn"
    });
  };
  
  // Function to capitalize first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Get the first name with capitalized first letter
  const getCapitalizedFirstName = () => {
    if (!userInfo) return '';
    
    const firstName = userInfo.firstName || userInfo.name.split(' ')[0];
    return capitalizeFirstLetter(firstName);
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
      
      {userInfo ? (
        <div className="container px-4 py-12 md:py-16 max-w-5xl mx-auto">
          <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-pastel-yellow/20">
              <CardTitle className="text-2xl md:text-3xl font-playfair text-center">
                Welcome back, {getCapitalizedFirstName()}!
              </CardTitle>
              <CardDescription className="text-center text-sm mb-1">
                It's great to see you again in the LeanOn community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2 pb-3">
              <div className="max-w-md mx-auto">
                <div className="bg-white/80 rounded-lg p-5 border border-pastel-yellow/20 shadow-sm relative">
                  {/* Ribbon placed inside the referral frame at the top */}
                  <div className="w-full max-w-xs mx-auto -mt-8 mb-1">
                    <img 
                      src="/lovable-uploads/3d91f1e7-6ad1-4ec9-abda-346a1a9dc39d.png" 
                      alt="Decorative Ribbon" 
                      className="w-full h-auto object-contain max-h-16"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-pastel-yellow" />
                    <h3 className="font-medium text-base">Invite Friends & Family</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Share your referral code with other moms and help grow our supportive community!
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-pastel-yellow/10 px-3 py-1.5 rounded-md font-mono text-sm font-medium flex-1 text-center border border-pastel-yellow/20">
                      {referralCode}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-shrink-0 bg-pastel-yellow text-foreground hover:bg-pastel-yellow/90 hover:text-foreground border-pastel-yellow px-2 py-1"
                      onClick={handleCopyReferralCode}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Each friend who joins gets a special welcome gift! 
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Hero onJoinClick={() => {}} />
      )}
      
      {/* Only showing the notification test button */}
      <div className="fixed bottom-8 right-8 z-10 space-y-2">
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
