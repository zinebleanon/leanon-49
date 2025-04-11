
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import { BellRing, Gift, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserInfo();
  
  useViewportHeight();
  
  // Generate a referral code if user doesn't have one
  useEffect(() => {
    if (userInfo && !userInfo.referralCode) {
      const newReferralCode = 'LO' + Math.random().toString(36).substring(2, 8).toUpperCase();
      updateUserInfo({ referralCode: newReferralCode });
    }
  }, [userInfo, updateUserInfo]);
  
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
    if (userInfo?.referralCode) {
      navigator.clipboard.writeText(userInfo.referralCode);
      toast({
        title: "Referral code copied!",
        description: "Share it with your friends to invite them to LeanOn"
      });
    }
  };
  
  const shareWhatsApp = () => {
    if (userInfo?.referralCode) {
      const message = `Join me on LeanOn with my referral code: ${userInfo.referralCode}\nDownload the app now, connect with other moms, and get a 5 AED MOE gift card!`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
  };
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const getCapitalizedFirstName = () => {
    if (!userInfo) return '';
    
    const firstName = userInfo.firstName || userInfo.name.split(' ')[0];
    return capitalizeFirstLetter(firstName);
  };
  
  const handleJoinClick = () => {
    navigate('/sign-up');
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
        <div className="container px-4 py-20 pt-32 md:pt-36 min-h-screen">
          <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden max-w-md w-full mx-auto mb-8">
            <CardHeader className="pb-2 bg-pastel-yellow/20">
              <CardTitle className="text-3xl md:text-4xl font-playfair text-center">
                Welcome back, {getCapitalizedFirstName()}!
              </CardTitle>
              <CardDescription className="text-base md:text-lg mb-1 text-center">
                It's great to see you again in the LeanOn community
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 pb-5">
              <div className="bg-white/80 rounded-lg p-4 border border-pastel-yellow/20 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="h-8 w-8 text-pastel-yellow" />
                  <h3 className="font-medium text-xl">Share Your Referral Code</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Share your code & get 5 AED Mall of the Emirates gift card for each friend who joins. <Link to="/terms" className="text-primary hover:underline">Conditions apply</Link>.
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-pastel-yellow/10 px-3 py-1.5 rounded-md font-mono text-lg font-medium flex-1 text-center border border-pastel-yellow/20">
                    {userInfo?.referralCode || 'Loading...'}
                  </div>
                  <Button 
                    variant="outline" 
                    size="md" 
                    className="flex-shrink-0 bg-pastel-yellow text-foreground hover:bg-pastel-yellow/90 hover:text-foreground border-pastel-yellow"
                    onClick={handleCopyReferralCode}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex gap-2 mb-1">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white border-green-500"
                    onClick={shareWhatsApp}
                  >
                    <Share2 className="h-5 w-5" />
                    Share via WhatsApp
                  </Button>
                </div>
                <div className="mt-4 pt-3 border-t border-pastel-yellow/20">
                  <Button 
                    variant="secondary"
                    className="w-full" 
                    onClick={() => navigate('/ally')}
                  >
                    Explore the Community
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Hero onJoinClick={handleJoinClick} />
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
