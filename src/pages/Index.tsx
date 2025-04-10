
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import { BellRing, Gift, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

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
        <div className="container px-4 py-16 md:py-24 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-pastel-green/20 to-background border-pastel-green/30 shadow-md overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl md:text-4xl font-playfair text-center">
                Welcome back, {userInfo.firstName || userInfo.name.split(' ')[0]}!
              </CardTitle>
              <CardDescription className="text-center text-base">
                It's great to see you again in the LeanOn community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="py-6">
              <div className="max-w-md mx-auto">
                <div className="bg-white/80 rounded-lg p-6 border border-pastel-green/20 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift className="h-6 w-6 text-pastel-green" />
                    <h3 className="font-medium text-lg">Invite Friends & Family</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    Share your referral code with other moms and help grow our supportive community!
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-pastel-green/10 px-4 py-2 rounded-md font-mono text-sm font-medium flex-1 text-center border border-pastel-green/20">
                      {referralCode}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-shrink-0 bg-pastel-green text-white hover:bg-pastel-green/90 hover:text-white border-pastel-green"
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
            
            <CardFooter className="pt-2 pb-6 flex justify-center">
              <Button 
                variant="warm" 
                size="lg" 
                onClick={() => navigate('/brands')}
                className="px-8"
              >
                Explore Exclusive Deals
              </Button>
            </CardFooter>
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
