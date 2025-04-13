import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BellRing, Gift, Share2, User, Clock, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserInfo();
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const location = useLocation();

  const [profileData, setProfileData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    neighborhood: userInfo?.neighborhood || '',
  });

  useEffect(() => {
    if (userInfo) {
      setProfileData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        neighborhood: userInfo.neighborhood || '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (location.hash === '#update-profile' && userInfo?.profileNeedsUpdate) {
      setShowProfileUpdate(true);
    }
  }, [location, userInfo]);

  const handleUpdateProfile = async () => {
    const success = await updateUserInfo({ ...profileData, profileNeedsUpdate: false });
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setShowProfileUpdate(false);
    } else {
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNotification = async () => {
    const permission = await askNotificationPermission();
    if (permission === 'granted') {
      sendPushNotification(
        'Welcome to LeanOn!',
        'Thanks for joining our community!',
        'https://leanon.app'
      );
    }
  };

  const shareWhatsApp = () => {
    if (userInfo?.referralCode) {
      const message = `Join Me on LeanOn, the new supportive Online Community for Moms. Use my Referral code: ${userInfo.referralCode}. You can get yours also, Refer & Earn.\n\nDownload Now: https://leanon.app`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
  };
  
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getCapitalizedFirstName = () => {
    return capitalizeFirstLetter(userInfo?.firstName || 'Mum');
  };

  const handleJoinClick = () => {
    navigate('/sign-up');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <img src="/logo.png" alt="LeanOn Logo" className="h-20 w-auto animate-bounce mb-4" />
        <p className="text-lg text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }
  
  return (
    
    
      <Navbar />
      <Hero />
      
      {userInfo?.profileNeedsUpdate && showProfileUpdate && (
        
          
            
              👋 Welcome {getCapitalizedFirstName()}!
            
            
              Please take a moment to complete your profile to get the most out of LeanOn.
            
          
          
            
              
                
                  
                    First Name
                  
                  
                    <Input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} />
                  
                
                
                  
                    Last Name
                  
                  
                    <Input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} />
                  
                
                
                  
                    Neighborhood
                  
                  
                    <Input type="text" name="neighborhood" value={profileData.neighborhood} onChange={handleChange} />
                  
                
              
            
            
              <Button onClick={handleUpdateProfile}>Update Profile</Button>
            
          
        
      )}

      
        <Footer />
      
    
  );
};

export default Index;
