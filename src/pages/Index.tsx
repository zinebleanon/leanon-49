
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
  
  useViewportHeight();
  
  useEffect(() => {
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
    
    const userName = userInfo?.name || localStorage.getItem('notification_user_name') || 'User';
    
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
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
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
        <div className="container px-2 py-2 max-w-5xl mx-auto">
          <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden">
            <CardHeader className="pb-0 pt-2 bg-pastel-yellow/20">
              <CardTitle className="text-xl md:text-2xl font-playfair text-center">
                Welcome back, {getCapitalizedFirstName()}!
              </CardTitle>
              <CardDescription className="text-center text-xs mb-0">
                It's great to see you again in the LeanOn community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 pb-1">
              <div className="w-full max-w-md mx-auto my-0">
                <img 
                  src="/lovable-uploads/3d91f1e7-6ad1-4ec9-abda-346a1a9dc39d.png" 
                  alt="Decorative Ribbon" 
                  className="w-full h-8 object-contain"
                />
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="bg-white/80 rounded-lg p-2 border border-pastel-yellow/20 shadow-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <Gift className="h-4 w-4 text-pastel-yellow" />
                    <h3 className="font-medium text-sm">Invite Friends & Family</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Share your referral code with other moms and help grow our supportive community!
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-pastel-yellow/10 px-3 py-1 rounded-md font-mono text-xs font-medium flex-1 text-center border border-pastel-yellow/20">
                      {referralCode}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-shrink-0 bg-pastel-yellow text-foreground hover:bg-pastel-yellow/90 hover:text-foreground border-pastel-yellow text-xs h-7"
                      onClick={handleCopyReferralCode}
                    >
                      Copy Code
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
