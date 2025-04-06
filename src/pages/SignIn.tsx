import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, ArrowLeft, Check, MapPin, Search } from 'lucide-react';
import BowIcon from '@/components/ui/BowIcon';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import BowRibbon from '@/components/mumzally/BowRibbon';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: OTP verification, 3: Profile
  const [otpValue, setOtpValue] = useState("");
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    neighborhood: '', 
    latitude: '',
    longitude: '',
    workStatus: 'stay-home',
    nationality: '',
    interests: '',
    birthDate: '',
    kids: [{ birthDate: '', gender: '' }]
  });
  
  const neighborhoods = [
    "Dubai Marina", "JLT", "Downtown Dubai", "Palm Jumeirah", "Arabian Ranches",
    "Emirates Hills", "Mirdif", "Dubailand", "Silicon Oasis", "Business Bay",
    "Al Barsha", "Deira", "Bur Dubai", "The Springs", "The Meadows", "The Greens",
    "Jumeirah", "Umm Suqeim", "Discovery Gardens", "International City"
  ];
  
  const nationalities = [
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", "Australian",
    "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean",
    "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe",
    "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean",
    "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian",
    "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian",
    "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek",
    "Grenadian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian",
    "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
    "Kiribati", "North Korean", "South Korean", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Lesothan", "Liberian",
    "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian",
    "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian",
    "Montenegrin", "Moroccan", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealand", "Nicaraguan", "Nigerian", "Nigerien",
    "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese",
    "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi",
    "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovak", "Slovenian", "Solomon Islander", "Somali",
    "South African", "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik",
    "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian",
    "Uruguayan", "Uzbek", "Vanuatuan", "Vatican", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
  ].sort((a, b) => a.localeCompare(b));
  
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [filteredNationalities, setFilteredNationalities] = useState(nationalities);

  useEffect(() => {
    if (nationalitySearch.trim() === '') {
      setFilteredNationalities(nationalities);
    } else {
      const filtered = nationalities.filter(nationality => 
        nationality.toLowerCase().includes(nationalitySearch.toLowerCase())
      );
      setFilteredNationalities(filtered);
    }
  }, [nationalitySearch]);

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSignUpData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
          
          const randomIndex = Math.floor(Math.random() * neighborhoods.length);
          const autoDetectedNeighborhood = neighborhoods[randomIndex];
          
          setSignUpData(prev => ({
            ...prev,
            neighborhood: autoDetectedNeighborhood
          }));
          
          toast({
            title: "Location detected",
            description: `We detected your neighborhood as ${autoDetectedNeighborhood}`,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not get your location. You can still select your neighborhood.",
            variant: "destructive"
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Geolocation unavailable",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
    }
  };
  
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '');
      
      if (formattedValue.startsWith('0')) {
        formattedValue = formattedValue.substring(1);
      }
      
      if (formattedValue.length > 9) {
        formattedValue = formattedValue.substring(0, 9);
      }
      
      setSignUpData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  const handleKidChange = (index: number, field: 'birthDate' | 'gender', value: string) => {
    const newKids = [...signUpData.kids];
    newKids[index] = { ...newKids[index], [field]: value };
    setSignUpData(prev => ({ ...prev, kids: newKids }));
  };

  const addKid = () => {
    setSignUpData(prev => ({
      ...prev, 
      kids: [...prev.kids, { birthDate: '', gender: '' }]
    }));
  };

  const removeKid = (index: number) => {
    if (signUpData.kids.length > 1) {
      const newKids = [...signUpData.kids];
      newKids.splice(index, 1);
      setSignUpData(prev => ({ ...prev, kids: newKids }));
    }
  };
  
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate('/ally/subscribe');
    }, 1500);
  };
  
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (signupStep === 1) {
      if (signUpData.password !== signUpData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      if (signUpData.phone.length < 8) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid UAE phone number.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setSignupStep(2);
        toast({
          title: "Verification code sent",
          description: `We've sent a code to +971 ${formatPhoneDisplay(signUpData.phone)}`,
        });
      }, 1500);
    } else if (signupStep === 2) {
      if (otpValue.length !== 6) {
        toast({
          title: "Invalid code",
          description: "Please enter the 6-digit verification code.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setSignupStep(3);
        toast({
          title: "Phone verified",
          description: "Now, let's complete your profile"
        });
      }, 1500);
    } else if (signupStep === 3) {
      if (!signUpData.neighborhood || !signUpData.workStatus) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        
        const userInfo = {
          name: signUpData.name,
          email: signUpData.email,
          neighborhood: signUpData.neighborhood,
          phone: signUpData.phone,
          location: {
            latitude: signUpData.latitude,
            longitude: signUpData.longitude
          },
          workStatus: signUpData.workStatus,
          nationality: signUpData.nationality,
          interests: signUpData.interests,
          birthDate: signUpData.birthDate,
          kids: signUpData.kids
        };
        
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        toast({
          title: "Account created!",
          description: "Your profile has been created successfully.",
        });
        navigate('/ally/subscribe');
      }, 1500);
    }
  };
  
  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    
    if (phone.length <= 9) {
      if (phone.length <= 2) {
        return phone;
      } else if (phone.length <= 5) {
        return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      } else {
        return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
      }
    }
    
    return phone;
  };
  
  const resendOTP = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Code resent",
        description: `We've sent a new verification code to +971 ${formatPhoneDisplay(signUpData.phone)}`,
      });
    }, 1000);
  };
  
  const goBack = () => {
    if (signupStep > 1) {
      setSignupStep(prev => prev - 1);
      return;
    }
    
    navigate(-1);
  };

  const switchToSignUp = () => {
    setActiveTab("signup");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-0 relative">
      <div className="absolute top-4 left-4">
        <img 
          src="/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png" 
          alt="LeanOn Logo" 
          className="w-16 h-auto"
        />
      </div>
      
      <div className="absolute top-8 right-4">
        <Button 
          variant="ghost" 
          onClick={goBack} 
          className="flex items-center px-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {signupStep > 1 ? "Back" : "Back"}
        </Button>
      </div>
      
      <div className="w-full max-w-md mt-28">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold font-playfair">Welcome to LeanOn</h1>
          <p className="text-gray-600 text-sm">A community of supportive moms</p>
        </div>
        
        <Tabs defaultValue="signin" className="w-full mt-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-2 bg-secondary/30">
            <TabsTrigger value="signin" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card className="border-secondary/20 shadow-md">
              <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-secondary/30 focus:border-secondary"
                      icon={<Mail className="h-4 w-4" />}
                      value={signInData.email}
                      onChange={handleSignInChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <Button 
                        variant="link" 
                        className="text-xs p-0 h-auto font-normal text-muted-foreground"
                        type="button"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input 
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="border-secondary/30 focus:border-secondary"
                      icon={<Lock className="h-4 w-4" />}
                      value={signInData.password}
                      onChange={handleSignInChange}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-3 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    )}
                    Sign In
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    No account? <Button variant="link" onClick={switchToSignUp} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign up</Button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="border-secondary/20 shadow-md">
              <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
                <CardTitle>
                  {signupStep === 1 ? "Create an Account" : 
                   signupStep === 2 ? "Verify Your Phone" : 
                   "Complete Your Profile"}
                </CardTitle>
                {signupStep === 2 && (
                  <CardDescription>
                    Enter the 6-digit code sent to +971 {formatPhoneDisplay(signUpData.phone)}
                  </CardDescription>
                )}
                {signupStep === 3 && (
                  <CardDescription>
                    Tell us more about you to find the right matches
                  </CardDescription>
                )}
              </CardHeader>
              <form onSubmit={handleSignUpSubmit}>
                {signupStep === 1 && (
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input 
                        id="signup-name"
                        name="name"
                        placeholder="Enter your full name"
                        className="border-secondary/30 focus:border-secondary"
                        value={signUpData.name}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="border-secondary/30 focus:border-secondary"
                        icon={<Mail className="h-4 w-4" />}
                        value={signUpData.email}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number (UAE only)</Label>
                      <div className="flex items-center">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input h-10 text-sm">
                          +971
                        </div>
                        <Input 
                          id="signup-phone"
                          name="phone"
                          type="tel"
                          placeholder="XX XXX XXXX"
                          className="border-secondary/30 focus:border-secondary rounded-l-none"
                          value={formatPhoneDisplay(signUpData.phone)}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Enter without leading 0</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="signup-neighborhood">Your Neighborhood</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="h-8 flex items-center gap-1 text-xs"
                          onClick={getLocation}
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Get Location</span>
                        </Button>
                      </div>
                      <select
                        id="signup-neighborhood"
                        name="neighborhood"
                        className="w-full rounded-md border-secondary/30 focus:border-secondary h-10 px-3"
                        value={signUpData.neighborhood}
                        onChange={handleSignUpChange}
                        required
                      >
                        <option value="" disabled>Select your neighborhood</option>
                        {neighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Activate location so we can propose the closest Moms to you.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        className="border-secondary/30 focus:border-secondary"
                        icon={<Lock className="h-4 w-4" />}
                        value={signUpData.password}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input 
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="border-secondary/30 focus:border-secondary"
                        value={signUpData.confirmPassword}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                  </CardContent>
                )}
                
                {signupStep === 2 && (
                  <CardContent className="space-y-6 pt-6">
                    <div className="text-center mb-4">
                      <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium">
                        +971 {formatPhoneDisplay(signUpData.phone)}
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6} 
                        value={otpValue} 
                        onChange={setOtpValue}
                        className="gap-2"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        variant="link" 
                        type="button" 
                        onClick={resendOTP}
                        disabled={isLoading}
                        className="text-muted-foreground text-sm"
                      >
                        Didn't receive a code? Resend
                      </Button>
                    </div>
                  </CardContent>
                )}
                
                {signupStep === 3 && (
                  <CardContent className="space-y-4 pt-6 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-birthdate">Your Birth Date</Label>
                      <Input
                        id="signup-birthdate"
                        name="birthDate"
                        type="date"
                        className="border-secondary/30 focus:border-secondary"
                        value={signUpData.birthDate}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-nationality">Your Nationality</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {signUpData.nationality || "Select your nationality"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                          <div className="p-2">
                            <div className="flex items-center border rounded-md px-2">
                              <Search className="h-4 w-4 text-muted-foreground mr-2" />
                              <Input
                                placeholder="Search..."
                                value={nationalitySearch}
                                onChange={(e) => setNationalitySearch(e.target.value)}
                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                              />
                            </div>
                          </div>
                          <div className="max-h-[200px] overflow-y-auto">
                            {filteredNationalities.length > 0 ? (
                              filteredNationalities.map((nationality) => (
                                <div
                                  key={nationality}
                                  className="px-3 py-2 text-sm cursor-pointer hover:bg-secondary"
                                  onClick={() => {
                                    const newSignUpData = {...signUpData, nationality};
                                    setSignUpData(newSignUpData);
                                    setNationalitySearch('');
                                  }}
                                >
                                  {nationality}
                                </div>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                No results found
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Work Status</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="work-status-stay-home"
                            name="workStatus"
                            value="stay-home"
                            checked={signUpData.workStatus === 'stay-home'}
                            onChange={handleSignUpChange}
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
                            checked={signUpData.workStatus === 'working'}
                            onChange={handleSignUpChange}
                            className="mr-2"
                          />
                          <Label htmlFor="work-status-working">Working Mom</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Your Kids</Label>
                      {signUpData.kids.map((kid, index) => (
                        <div key={index} className="flex gap-2 items-end mt-2">
                          <div className="flex-1">
                            <Label htmlFor={`kid-birthdate-${index}`} className="text-xs">Birth Date</Label>
                            <Input
                              id={`kid-birthdate-${index}`}
                              type="date"
                              value={kid.birthDate}
                              onChange={(e) => handleKidChange(index, 'birthDate', e.target.value)}
                              className="border-secondary/30 focus:border-secondary"
                              required
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`kid-gender-${index}`} className="text-xs">Gender</Label>
                            <select
                              id={`kid-gender-${index}`}
                              value={kid.gender}
                              onChange={(e) => handleKidChange(index, 'gender', e.target.value)}
                              className="w-full rounded-md border-secondary/30 focus:border-secondary h-10 px-3"
                              required
                            >
                              <option value="" disabled>Select</option>
                              <option value="boy">Boy</option>
                              <option value="girl">Girl</option>
                            </select>
                          </div>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-10 w-10"
                              onClick={() => removeKid(index)}
                            >
                              -
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addKid}
                        className="mt-2"
                      >
                        + Add Child
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-interests">Your Interests</Label>
                      <textarea
                        id="signup-interests"
                        name="interests"
                        rows={3}
                        placeholder="What are you interested in? (e.g., Cooking, Fitness, Reading)"
                        className="w-full rounded-md border-secondary/30 focus:border-secondary px-3 py-2"
                        value={signUpData.interests}
                        onChange={handleSignUpChange}
                      ></textarea>
                    </div>
                  </CardContent>
                )}
                
                <CardFooter className="flex-col space-y-4 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    )}
                    {signupStep === 1 ? (
                      <>
                        <BowIcon className="mr-2 h-4 w-4" fill="currentColor" />
                        Continue
                      </>
                    ) : signupStep === 2 ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Verify Phone
                      </>
                    ) : (
                      <>
                        <BowRibbon className="mr-2 h-4 w-4" isActive={true} />
                        Create Account
                      </>
                    )}
                  </Button>
                  
                  {signupStep === 1 && (
                    <p className="text-xs text-center text-muted-foreground">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  )}
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignIn;
