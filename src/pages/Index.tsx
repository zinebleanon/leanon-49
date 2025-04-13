import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';
import { BellRing, Gift, Share2, User, Clock, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { askNotificationPermission, sendPushNotification } from '@/utils/pushNotifications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
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
    workStatus: 'full-time',
    nationality: '',
    birthDate: '',
    interests: '',
    kids: [{ birthDate: '', gender: 'boy' }]
  });
  
  useViewportHeight();
  
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

  useEffect(() => {
    if (location.state?.openProfileUpdate) {
      openProfileUpdateForm();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
      const [_, kidIndex, kidField] = name.split('.');
      setProfileData(prev => {
        const updatedKids = [...prev.kids];
        updatedKids[parseInt(kidIndex)][kidField] = value;
        return { ...prev, kids: updatedKids };
      });
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleKidInputChange = (index: number, field: string, value: string) => {
    setProfileData(prev => {
      const updatedKids = [...prev.kids];
      updatedKids[index] = { ...updatedKids[index], [field]: value };
      return { ...prev, kids: updatedKids };
    });
  };
  
  const handleAddChild = () => {
    setProfileData(prev => ({
      ...prev,
      kids: [...prev.kids, { birthDate: '', gender: 'boy' }]
    }));
  };
  
  const handleRemoveChild = (index: number) => {
    if (profileData.kids.length <= 1) return;
    
    setProfileData(prev => {
      const updatedKids = prev.kids.filter((_, i) => i !== index);
      return { ...prev, kids: updatedKids };
    });
  };
  
  const handleCompleteProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const updatedUserInfo = {
      ...userInfo,
      workStatus: profileData.workStatus,
      nationality: profileData.nationality,
      birthDate: profileData.birthDate,
      interests: profileData.interests,
      kids: profileData.kids.map(kid => ({ 
        birthDate: kid.birthDate, 
        gender: kid.gender 
      })),
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
  
  const openProfileUpdateForm = () => {
    setShowProfileUpdate(true);
    
    const kids = userInfo?.kids && userInfo.kids.length > 0 
      ? userInfo.kids.map(kid => ({ birthDate: kid.birthDate || '', gender: kid.gender || 'boy' }))
      : [{ birthDate: '', gender: 'boy' }];
    
    setProfileData({
      workStatus: userInfo?.workStatus || 'full-time',
      nationality: userInfo?.nationality || '',
      birthDate: userInfo?.birthDate || '',
      interests: userInfo?.interests || '',
      kids
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
                    variant="warm"
                    className="w-full text-sm max-w-[200px] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80"
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
                    <RadioGroup
                      value={profileData.workStatus}
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, workStatus: value }))}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="work-status-full-time" />
                        <Label htmlFor="work-status-full-time">Full Time Mom</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="working" id="work-status-working" />
                        <Label htmlFor="work-status-working">Working Mom</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Your Nationality</Label>
                    <Select 
                      value={profileData.nationality} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, nationality: value }))}
                    >
                      <SelectTrigger id="nationality">
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Afghan">Afghan</SelectItem>
                        <SelectItem value="Albanian">Albanian</SelectItem>
                        <SelectItem value="Algerian">Algerian</SelectItem>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="Andorran">Andorran</SelectItem>
                        <SelectItem value="Angolan">Angolan</SelectItem>
                        <SelectItem value="Antiguan">Antiguan</SelectItem>
                        <SelectItem value="Argentine">Argentine</SelectItem>
                        <SelectItem value="Armenian">Armenian</SelectItem>
                        <SelectItem value="Australian">Australian</SelectItem>
                        <SelectItem value="Austrian">Austrian</SelectItem>
                        <SelectItem value="Azerbaijani">Azerbaijani</SelectItem>
                        <SelectItem value="Bahamian">Bahamian</SelectItem>
                        <SelectItem value="Bahraini">Bahraini</SelectItem>
                        <SelectItem value="Bangladeshi">Bangladeshi</SelectItem>
                        <SelectItem value="Barbadian">Barbadian</SelectItem>
                        <SelectItem value="Belarusian">Belarusian</SelectItem>
                        <SelectItem value="Belgian">Belgian</SelectItem>
                        <SelectItem value="Belizean">Belizean</SelectItem>
                        <SelectItem value="Beninese">Beninese</SelectItem>
                        <SelectItem value="Bhutanese">Bhutanese</SelectItem>
                        <SelectItem value="Bolivian">Bolivian</SelectItem>
                        <SelectItem value="Bosnian">Bosnian</SelectItem>
                        <SelectItem value="Brazilian">Brazilian</SelectItem>
                        <SelectItem value="British">British</SelectItem>
                        <SelectItem value="Bruneian">Bruneian</SelectItem>
                        <SelectItem value="Bulgarian">Bulgarian</SelectItem>
                        <SelectItem value="Burkinabe">Burkinabe</SelectItem>
                        <SelectItem value="Burmese">Burmese</SelectItem>
                        <SelectItem value="Burundian">Burundian</SelectItem>
                        <SelectItem value="Cambodian">Cambodian</SelectItem>
                        <SelectItem value="Cameroonian">Cameroonian</SelectItem>
                        <SelectItem value="Canadian">Canadian</SelectItem>
                        <SelectItem value="Cape Verdean">Cape Verdean</SelectItem>
                        <SelectItem value="Central African">Central African</SelectItem>
                        <SelectItem value="Chadian">Chadian</SelectItem>
                        <SelectItem value="Chilean">Chilean</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Colombian">Colombian</SelectItem>
                        <SelectItem value="Comoran">Comoran</SelectItem>
                        <SelectItem value="Congolese">Congolese</SelectItem>
                        <SelectItem value="Costa Rican">Costa Rican</SelectItem>
                        <SelectItem value="Croatian">Croatian</SelectItem>
                        <SelectItem value="Cuban">Cuban</SelectItem>
                        <SelectItem value="Cypriot">Cypriot</SelectItem>
                        <SelectItem value="Czech">Czech</SelectItem>
                        <SelectItem value="Danish">Danish</SelectItem>
                        <SelectItem value="Djiboutian">Djiboutian</SelectItem>
                        <SelectItem value="Dominican">Dominican</SelectItem>
                        <SelectItem value="Dutch">Dutch</SelectItem>
                        <SelectItem value="East Timorese">East Timorese</SelectItem>
                        <SelectItem value="Ecuadorean">Ecuadorean</SelectItem>
                        <SelectItem value="Egyptian">Egyptian</SelectItem>
                        <SelectItem value="Emirian">Emirian</SelectItem>
                        <SelectItem value="Equatorial Guinean">Equatorial Guinean</SelectItem>
                        <SelectItem value="Eritrean">Eritrean</SelectItem>
                        <SelectItem value="Estonian">Estonian</SelectItem>
                        <SelectItem value="Ethiopian">Ethiopian</SelectItem>
                        <SelectItem value="Fijian">Fijian</SelectItem>
                        <SelectItem value="Filipino">Filipino</SelectItem>
                        <SelectItem value="Finnish">Finnish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Gabonese">Gabonese</SelectItem>
                        <SelectItem value="Gambian">Gambian</SelectItem>
                        <SelectItem value="Georgian">Georgian</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Ghanaian">Ghanaian</SelectItem>
                        <SelectItem value="Greek">Greek</SelectItem>
                        <SelectItem value="Grenadian">Grenadian</SelectItem>
                        <SelectItem value="Guatemalan">Guatemalan</SelectItem>
                        <SelectItem value="Guinean">Guinean</SelectItem>
                        <SelectItem value="Guyanese">Guyanese</SelectItem>
                        <SelectItem value="Haitian">Haitian</SelectItem>
                        <SelectItem value="Honduran">Honduran</SelectItem>
                        <SelectItem value="Hungarian">Hungarian</SelectItem>
                        <SelectItem value="Icelandic">Icelandic</SelectItem>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Indonesian">Indonesian</SelectItem>
                        <SelectItem value="Iranian">Iranian</SelectItem>
                        <SelectItem value="Iraqi">Iraqi</SelectItem>
                        <SelectItem value="Irish">Irish</SelectItem>
                        <SelectItem value="Israeli">Israeli</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Ivorian">Ivorian</SelectItem>
                        <SelectItem value="Jamaican">Jamaican</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Jordanian">Jordanian</SelectItem>
                        <SelectItem value="Kazakhstani">Kazakhstani</SelectItem>
                        <SelectItem value="Kenyan">Kenyan</SelectItem>
                        <SelectItem value="Kiribati">Kiribati</SelectItem>
                        <SelectItem value="Korean">Korean</SelectItem>
                        <SelectItem value="Kuwaiti">Kuwaiti</SelectItem>
                        <SelectItem value="Kyrgyz">Kyrgyz</SelectItem>
                        <SelectItem value="Laotian">Laotian</SelectItem>
                        <SelectItem value="Latvian">Latvian</SelectItem>
                        <SelectItem value="Lebanese">Lebanese</SelectItem>
                        <SelectItem value="Liberian">Liberian</SelectItem>
                        <SelectItem value="Libyan">Libyan</SelectItem>
                        <SelectItem value="Liechtensteiner">Liechtensteiner</SelectItem>
                        <SelectItem value="Lithuanian">Lithuanian</SelectItem>
                        <SelectItem value="Luxembourger">Luxembourger</SelectItem>
                        <SelectItem value="Macedonian">Macedonian</SelectItem>
                        <SelectItem value="Malagasy">Malagasy</SelectItem>
                        <SelectItem value="Malawian">Malawian</SelectItem>
                        <SelectItem value="Malaysian">Malaysian</SelectItem>
                        <SelectItem value="Maldivian">Maldivian</SelectItem>
                        <SelectItem value="Malian">Malian</SelectItem>
                        <SelectItem value="Maltese">Maltese</SelectItem>
                        <SelectItem value="Marshallese">Marshallese</SelectItem>
                        <SelectItem value="Mauritanian">Mauritanian</SelectItem>
                        <SelectItem value="Mauritian">Mauritian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                        <SelectItem value="Micronesian">Micronesian</SelectItem>
                        <SelectItem value="Moldovan">Moldovan</SelectItem>
                        <SelectItem value="Monacan">Monacan</SelectItem>
                        <SelectItem value="Mongolian">Mongolian</SelectItem>
                        <SelectItem value="Moroccan">Moroccan</SelectItem>
                        <SelectItem value="Mozambican">Mozambican</SelectItem>
                        <SelectItem value="Namibian">Namibian</SelectItem>
                        <SelectItem value="Nauruan">Nauruan</SelectItem>
                        <SelectItem value="Nepalese">Nepalese</SelectItem>
                        <SelectItem value="New Zealander">New Zealander</SelectItem>
                        <SelectItem value="Nicaraguan">Nicaraguan</SelectItem>
                        <SelectItem value="Nigerian">Nigerian</SelectItem>
                        <SelectItem value="Norwegian">Norwegian</SelectItem>
                        <SelectItem value="Omani">Omani</SelectItem>
                        <SelectItem value="Pakistani">Pakistani</SelectItem>
                        <SelectItem value="Palauan">Palauan</SelectItem>
                        <SelectItem value="Panamanian">Panamanian</SelectItem>
                        <SelectItem value="Papua New Guinean">Papua New Guinean</SelectItem>
                        <SelectItem value="Paraguayan">Paraguayan</SelectItem>
                        <SelectItem value="Peruvian">Peruvian</SelectItem>
                        <SelectItem value="Polish">Polish</SelectItem>
                        <SelectItem value="Portuguese">Portuguese</SelectItem>
                        <SelectItem value="Qatari">Qatari</SelectItem>
                        <SelectItem value="Romanian">Romanian</SelectItem>
                        <SelectItem value="Russian">Russian</SelectItem>
                        <SelectItem value="Rwandan">Rwandan</SelectItem>
                        <SelectItem value="Saint Lucian">Saint Lucian</SelectItem>
                        <SelectItem value="Salvadoran">Salvadoran</SelectItem>
                        <SelectItem value="Samoan">Samoan</SelectItem>
                        <SelectItem value="San Marinese">San Marinese</SelectItem>
                        <SelectItem value="Sao Tomean">Sao Tomean</SelectItem>
                        <SelectItem value="Saudi">Saudi</SelectItem>
                        <SelectItem value="Senegalese">Senegalese</SelectItem>
                        <SelectItem value="Serbian">Serbian</SelectItem>
                        <SelectItem value="Seychellois">Seychellois</SelectItem>
                        <SelectItem value="Sierra Leonean">Sierra Leonean</SelectItem>
                        <SelectItem value="Singaporean">Singaporean</SelectItem>
                        <SelectItem value="Slovakian">Slovakian</SelectItem>
                        <SelectItem value="Slovenian">Slovenian</SelectItem>
                        <SelectItem value="Solomon Islander">Solomon Islander</SelectItem>
                        <SelectItem value="Somali">Somali</SelectItem>
                        <SelectItem value="South African">South African</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="Sri Lankan">Sri Lankan</SelectItem>
                        <SelectItem value="Sudanese">Sudanese</SelectItem>
                        <SelectItem value="Surinamer">Surinamer</SelectItem>
                        <SelectItem value="Swazi">Swazi</SelectItem>
                        <SelectItem value="Swedish">Swedish</SelectItem>
                        <SelectItem value="Swiss">Swiss</SelectItem>
                        <SelectItem value="Syrian">Syrian</SelectItem>
                        <SelectItem value="Taiwanese">Taiwanese</SelectItem>
                        <SelectItem value="Tajik">Tajik</SelectItem>
                        <SelectItem value="Tanzanian">Tanzanian</SelectItem>
                        <SelectItem value="Thai">Thai</SelectItem>
                        <SelectItem value="Togolese">Togolese</SelectItem>
                        <SelectItem value="Tongan">Tongan</SelectItem>
                        <SelectItem value="Trinidadian">Trinidadian</SelectItem>
                        <SelectItem value="Tunisian">Tunisian</SelectItem>
                        <SelectItem value="Turkish">Turkish</SelectItem>
                        <SelectItem value="Tuvaluan">Tuvaluan</SelectItem>
                        <SelectItem value="Ugandan">Ugandan</SelectItem>
                        <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                        <SelectItem value="Uruguayan">Uruguayan</SelectItem>
                        <SelectItem value="Uzbekistani">Uzbekistani</SelectItem>
                        <SelectItem value="Venezuelan">Venezuelan</SelectItem>
                        <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                        <SelectItem value="Yemeni">Yemeni</SelectItem>
                        <SelectItem value="Zambian">Zambian</SelectItem>
                        <SelectItem value="Zimbabwean">Zimbabwean</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <div className="flex items-center justify-between">
                      <Label>Your Children</Label>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-2"
                        onClick={handleAddChild}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Child
                      </Button>
                    </div>
                    
                    {profileData.kids.map((kid, index) => (
                      <div key={index} className="border rounded-md p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Child {index + 1}</span>
                          {profileData.kids.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => handleRemoveChild(index)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          )}
                        </div>
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Label htmlFor={`kid-birthdate-${index}`} className="text-xs">Birth Date</Label>
                            <Input
                              id={`kid-birthdate-${index}`}
                              type="date"
                              value={kid.birthDate}
                              onChange={(e) => handleKidInputChange(index, 'birthDate', e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`kid-gender-${index}`} className="text-xs">Gender</Label>
                            <Select
                              value={kid.gender}
                              onValueChange={(value) => handleKidInputChange(index, 'gender', value)}
                            >
                              <SelectTrigger id={`kid-gender-${index}`}>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="boy">Boy</SelectItem>
                                <SelectItem value="girl">Girl</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <div className="flex flex-col gap-3">
                    {(!userInfo.birthDate || !userInfo.nationality || !userInfo.kids || userInfo.kids.length === 0) && (
                      <Button 
                        variant="outline" 
                        onClick={openProfileUpdateForm}
                        className="bg-pastel-yellow/10 hover:bg-pastel-yellow/20 border-pastel-yellow/30"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Complete Your Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 border-pastel-yellow/30 shadow-md overflow-hidden w-full">
                <CardHeader className="pb-2 bg-pastel-yellow/20">
                  <CardTitle className="text-xl md:text-2xl font-playfair">
                    Share Your Referral Code
                  </CardTitle>
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
