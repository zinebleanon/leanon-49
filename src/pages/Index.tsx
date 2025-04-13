import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { Button } from '@/components/ui/button';
import { BellRing, Gift, Share2, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo, updateUserInfo } = useUserInfo();
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  
  const [profileData, setProfileData] = useState({
    workStatus: 'stay-home',
    nationality: '',
    birthDate: '',
    interests: '',
    kid: { birthDate: '', gender: 'boy' }
  });
  
  useViewportHeight();
  
  useEffect(() => {
    if (userInfo && !userInfo.referralCode) {
      const newReferralCode = 'LO' + Math.random().toString(36).substring(2, 8).toUpperCase();
      updateUserInfo({ referralCode: newReferralCode });
    }
  }, [userInfo, updateUserInfo]);
  
  useEffect(() => {
    if (userInfo?.profileNeedsUpdate) {
      setShowProfileUpdate(true);
      
      setProfileData({
        workStatus: userInfo.workStatus || 'stay-home',
        nationality: userInfo.nationality || '',
        birthDate: userInfo.birthDate || '',
        interests: userInfo.interests || '',
        kid: userInfo.kids && userInfo.kids.length > 0 
          ? { birthDate: userInfo.kids[0].birthDate || '', gender: userInfo.kids[0].gender || 'boy' }
          : { birthDate: '', gender: 'boy' }
      });
    }
  }, [userInfo]);
  
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
  
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('kid.')) {
      const kidField = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        kid: {
          ...prev.kid,
          [kidField]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleCompleteProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const updatedUserInfo = {
      ...userInfo,
      workStatus: profileData.workStatus,
      nationality: profileData.nationality,
      birthDate: profileData.birthDate,
      interests: profileData.interests,
      kids: [{ 
        birthDate: profileData.kid.birthDate, 
        gender: profileData.kid.gender 
      }],
      profileNeedsUpdate: false
    };
    
    updateUserInfo(updatedUserInfo);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been completed successfully!"
    });
    
    setShowProfileUpdate(false);
  };
  
  const handleSkipProfileUpdate = () => {
    updateUserInfo({ profileNeedsUpdate: false });
    setShowProfileUpdate(false);
    
    toast({
      description: "You can complete your profile anytime from the Profile page"
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
        <div className="container px-4 py-20 pt-32 md:pt-36 min-h-screen">
          {showProfileUpdate ? (
            <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden max-w-md w-full mx-auto mb-8">
              <CardHeader className="pb-2 bg-pastel-yellow/20">
                <CardTitle className="text-3xl md:text-4xl font-playfair text-center">
                  Complete Your Profile
                </CardTitle>
                <CardDescription className="text-base md:text-lg mb-1 text-center">
                  Help us find Moms Around You
                </CardDescription>
                <div className="flex justify-center mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm max-w-[200px]"
                    onClick={handleSkipProfileUpdate}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Do this later
                  </Button>
                </div>
              </CardHeader>
              
              <form onSubmit={handleCompleteProfile}>
                <CardContent className="pt-4 pb-5 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workStatus">I am a:</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="work-status-stay-home"
                          name="workStatus"
                          value="stay-home"
                          checked={profileData.workStatus === 'stay-home'}
                          onChange={handleProfileInputChange}
                          className="mr-2"
                        />
                        <Label htmlFor="work-status-stay-home">Stay-at-home Mom</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="work-status-working"
                          name="workStatus"
                          value="working"
                          checked={profileData.workStatus === 'working'}
                          onChange={handleProfileInputChange}
                          className="mr-2"
                        />
                        <Label htmlFor="work-status-working">Working Mom</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Your Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      placeholder="e.g., American, Indian, Filipino"
                      value={profileData.nationality}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Your Birth Date</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={profileData.birthDate}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Your Child</Label>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label htmlFor="kid-birthdate" className="text-xs">Birth Date</Label>
                        <Input
                          id="kid-birthdate"
                          name="kid.birthDate"
                          type="date"
                          value={profileData.kid.birthDate}
                          onChange={handleProfileInputChange}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="kid-gender" className="text-xs">Gender</Label>
                        <select
                          id="kid-gender"
                          name="kid.gender"
                          value={profileData.kid.gender}
                          onChange={handleProfileInputChange}
                          className="w-full rounded-md border-secondary/30 focus:border-secondary h-10 px-3"
                          required
                        >
                          <option value="boy">Boy</option>
                          <option value="girl">Girl</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interests">Your Interests</Label>
                    <textarea
                      id="interests"
                      name="interests"
                      rows={3}
                      placeholder="What are you interested in? (e.g., Cooking, Fitness, Reading)"
                      className="w-full rounded-md border-secondary/30 focus:border-secondary px-3 py-2"
                      value={profileData.interests}
                      onChange={handleProfileInputChange}
                    ></textarea>
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-3 pt-2 pb-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                  >
                    Complete My Profile
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-6 max-w-md mx-auto">
              <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden w-full">
                <CardHeader className="pb-2 bg-pastel-yellow/20">
                  <CardTitle className="text-3xl md:text-4xl font-playfair text-center">
                    Welcome back, {getCapitalizedFirstName()}!
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg mb-1 text-center">
                    It's great to see you again in the LeanOn community
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-5 pb-6 text-center">
                  <Link to="/profile" className="block mb-5">
                    <Button variant="warm" className="px-6">
                      <User className="h-4 w-4 mr-2" />
                      View & Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden w-full">
                <CardHeader className="pb-2 bg-pastel-yellow/20">
                  <CardTitle className="text-xl md:text-2xl font-playfair">
                    Share Your Referral Code
                  </CardTitle>
                  <CardDescription className="text-sm mb-1">
                    Invite friends & get a 5 AED Mall of the Emirates gift card
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-4 pb-5">
                  <div className="bg-white/80 rounded-lg p-4 border border-pastel-yellow/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-6 w-6 text-pastel-yellow" />
                      <h3 className="font-medium text-lg">Refer & Earn</h3>
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
                    <div className="flex gap-2">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
